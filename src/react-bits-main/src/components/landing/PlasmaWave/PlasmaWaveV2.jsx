import { useRef, useEffect, useState } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

const vertex = /* glsl */ `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float focalLength;
uniform float speed1;
uniform float speed2;
uniform float dir2;
uniform float bend1;
uniform float bend2;
uniform float bendAdj1;
uniform float bendAdj2;
uniform float uOpacity;

const float lt   = 0.05;
const float pi   = 3.141592653589793;
const float pi2  = pi * 2.0;
const float pi_2 = pi * 0.5;
#define MAX_STEPS 15
#define A(v) mat2(cos(m.v + radians(vec4(0.0,-90.0,90.0,0.0))))

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;
  vec2  m = vec2(0.0);

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, focalLength));
  vec3 k = vec3(0.0);
  vec3 p;

  mat2 v = A(y), h = A(x);

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * speed1;
  float tSpeed2 = t * speed2 * dir2;

  for (int step = 0; step < MAX_STEPS; ++step) {
    p = o + u * d;
    p.yz *= v;
    p.xz *= h;
    p.x  -= 15.0;

    float px = p.x;
    float wob1 = bend1 + bendAdj1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = bend2 + bendAdj2 + cos(t2 + px * 1.1) * 0.1;

    vec2 baseOffset = vec2(px, px + pi_2);
    vec2 sinOffset  = sin(baseOffset + tSpeed1) * wob1;
    vec2 cosOffset  = cos(baseOffset + tSpeed2) * wob2;

    float wSin = length(p.yz - sinOffset) - lt;
    float wCos = length(p.yz - cosOffset) - lt;

    k.x = max(px + lt, wSin);
    k.y = max(px + lt, wCos);

    s = min(s, min(k.x, k.y));
    if (s < 0.001 || d > 400.0) break;
    d += s * 0.7;
  }

  vec3 c = max(cos(d * pi2) - s * sqrt(d) - k, 0.0);
  c.gb += 0.1;
  if (max(c.r, max(c.g, c.b)) < 0.15) discard;
  C = vec4(c * 0.4 + c.brg * 0.6 + c * c, uOpacity);
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
`;

export default function PlasmaWaveV2({
  xOffset = 0,
  yOffset = 0,
  rotationDeg = 0,
  focalLength = 0.8,
  speed1 = 0.1,
  speed2 = 0.1,
  dir2 = 1.0,
  bend1 = 0.9,
  bend2 = 0.6,
  fadeInDuration = 2000
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const uniformOffset = useRef(new Float32Array([xOffset, yOffset]));
  const uniformResolution = useRef(new Float32Array([1, 1]));
  const rendererRef = useRef(null);
  const fadeStartTime = useRef(null);
  const lastTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);

  const propsRef = useRef({
    xOffset, yOffset, rotationDeg, focalLength,
    speed1, speed2, dir2, bend1, bend2, fadeInDuration,
  });
  propsRef.current = {
    xOffset, yOffset, rotationDeg, focalLength,
    speed1, speed2, dir2, bend1, bend2, fadeInDuration,
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1),
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    containerRef.current.appendChild(gl.canvas);

    const camera = new Camera(gl);
    const scene = new Transform();

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: uniformResolution.current },
        uOffset: { value: uniformOffset.current },
        uRotation: { value: 0 },
        focalLength: { value: focalLength },
        speed1: { value: speed1 },
        speed2: { value: speed2 },
        dir2: { value: dir2 },
        bend1: { value: bend1 },
        bend2: { value: bend2 },
        bendAdj1: { value: 0 },
        bendAdj2: { value: 0 },
        uOpacity: { value: 0 },
      },
    });
    new Mesh(gl, { geometry, program }).setParent(scene);

    const resize = () => {
      const { width, height } =
        containerRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
      renderer.setSize(width, height);
      uniformResolution.current[0] = width * renderer.dpr;
      uniformResolution.current[1] = height * renderer.dpr;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(containerRef.current);

    let rafId;
    const loop = now => {
      const {
        xOffset: xOff,
        yOffset: yOff,
        rotationDeg: rot,
        focalLength: fLen,
        fadeInDuration: fadeDur,
      } = propsRef.current;

      if (isVisible) {
        if (lastTimeRef.current === 0) {
          lastTimeRef.current = now - pausedTimeRef.current;
        }

        const t = (now - lastTimeRef.current) * 0.001;

        if (fadeStartTime.current === null && t > 0.1) {
          fadeStartTime.current = now;
        }

        let opacity = 0;
        if (fadeStartTime.current !== null) {
          const fadeElapsed = now - fadeStartTime.current;
          opacity = Math.min(fadeElapsed / fadeDur, 1);
          opacity = 1 - Math.pow(1 - opacity, 3);
        }

        uniformOffset.current[0] = xOff;
        uniformOffset.current[1] = yOff;

        program.uniforms.iTime.value = t;
        program.uniforms.uRotation.value = rot * Math.PI / 180;
        program.uniforms.focalLength.value = fLen;
        program.uniforms.uOpacity.value = opacity;

        renderer.render({ scene, camera });
      } else {
        if (lastTimeRef.current !== 0) {
          pausedTimeRef.current = now - lastTimeRef.current;
          lastTimeRef.current = 0;
        }
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.gl.canvas.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, isVisible]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        width: '100vw',
        height: '100vh'
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(to top, #060010, transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
}
