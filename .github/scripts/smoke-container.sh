#!/usr/bin/env bash
set -euo pipefail

cleanup() {
  if [ "$?" -ne 0 ]; then docker logs website-test; fi
  docker rm -f website-test >/dev/null
}
docker run --platform linux/amd64 --name website-test -d -p 127.0.0.1:8080:80 "$TEST_IMAGE" >/dev/null
trap cleanup EXIT

base=http://127.0.0.1:8080
curl --fail --silent --show-error --retry 10 --retry-delay 1 --retry-connrefused "$base/" -o /tmp/website-home.html
grep -q '<html' /tmp/website-home.html
curl --fail --silent --show-error "$base/download" -o /tmp/website-download.html
grep -q '<html' /tmp/website-download.html
for locale in zh-cn en; do
  curl --fail --silent --show-error "$base/docs/$locale/" -o "/tmp/website-docs-$locale.html"
  grep -q 'docs-google-analytics' "/tmp/website-docs-$locale.html"
done
for path in /assets/does-not-exist.js /docs/does-not-exist/; do
  test "$(curl --silent --show-error -o /dev/null -w '%{http_code}' "$base$path")" = 404
done
test "$(curl --silent --show-error -o /dev/null -w '%{redirect_url}' -H 'Host: cherryai.com.cn' "$base/docs")" = 'http://cherryai.com.cn/docs/zh-cn/'
curl --fail --silent --show-error --head "$base/" -o /tmp/website-headers
grep -qi 'Cache-Control: public, max-age=0, must-revalidate' /tmp/website-headers
echo 'Container serves the website, both docs locales, redirects, real 404s and revalidation headers'
