import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Dialog,
  Input,
  InputGroup,
  Box,
  Text,
  Icon
} from '@chakra-ui/react';
import { FiSearch, FiLayers, FiImage, FiType, FiCircle, FiFile } from 'react-icons/fi';
import { AiOutlineEnter } from 'react-icons/ai';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../../constants/Categories';
import { useSearch } from '../../context/SearchContext/useSearch';

const levenshtein = (a, b) => {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : Math.min(dp[i - 1][j - 1] + 1, dp[i][j - 1] + 1, dp[i - 1][j] + 1);
    }
  }
  return dp[m][n];
};

const fuzzyMatch = (candidate, query) => {
  const lowerCandidate = candidate.toLowerCase();
  const lowerQuery = query.toLowerCase();
  if (lowerCandidate.includes(lowerQuery)) return true;
  const candidateWords = lowerCandidate.split(/\s+/);
  const queryWords = lowerQuery.split(/\s+/);
  return queryWords.every(qw =>
    candidateWords.some(cw => {
      const distance = levenshtein(cw, qw);
      const threshold = Math.max(1, Math.floor(qw.length / 3));
      return distance <= threshold;
    })
  );
};

function searchComponents(query) {
  if (!query || query.trim() === '') return [];
  const results = [];
  CATEGORIES.forEach(category => {
    const { name: categoryName, subcategories } = category;
    if (fuzzyMatch(categoryName, query)) {
      subcategories.forEach(component =>
        results.push({ categoryName, componentName: component })
      );
    } else {
      subcategories.forEach(component => {
        if (fuzzyMatch(component, query))
          results.push({ categoryName, componentName: component });
      });
    }
  });
  return results;
}

const AnimatedResult = ({ children, delay = 0, dataIndex, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.5, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={dataIndex}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

const categoryIconMapping = {
  "Get Started": FiFile,
  "Text Animations": FiType,
  "Animations": FiCircle,
  "Components": FiLayers,
  "Backgrounds": FiImage,
};

const SearchDialog = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const resultsRef = useRef(null);
  const navigate = useNavigate();
  const { toggleSearch } = useSearch();

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchValue(inputValue);
      setSelectedIndex(-1);
    }, 500);
    return () => clearTimeout(t);
  }, [inputValue]);

  const results = searchComponents(searchValue);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDist = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDist / 50, 1)
    );
  };

  useEffect(() => {
    if (!resultsRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = resultsRef.current;
    setBottomGradientOpacity(
      scrollHeight <= clientHeight
        ? 0
        : Math.min((scrollHeight - (scrollTop + clientHeight)) / 50, 1)
    );
  }, [results]);

  const handleSelect = useCallback(
    (result) => {
      const slug = (str) => str.replace(/\s+/g, "-").toLowerCase();
      navigate(`/${slug(result.categoryName)}/${slug(result.componentName)}`);
      setInputValue("");
      setSearchValue("");
      setSelectedIndex(-1);
      onClose();
    },
    [navigate, onClose]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (!searchValue) return;
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((p) => Math.min(p + 1, results.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((p) => Math.max(p - 1, 0));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [results, searchValue, selectedIndex, handleSelect]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !resultsRef.current) return;
    const container = resultsRef.current;
    const item = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (!item) return;

    const margin = 50;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    if (itemTop < container.scrollTop + margin) {
      container.scrollTo({ top: itemTop - margin, behavior: "smooth" });
    } else if (
      itemBottom >
      container.scrollTop + container.clientHeight - margin
    ) {
      container.scrollTo({
        top: itemBottom - container.clientHeight + margin,
        behavior: "smooth",
      });
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        toggleSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSearch]);

  useEffect(() => {
    if (isOpen) return;
    setInputValue("");
    setSearchValue("");
    setSelectedIndex(-1);
    setTopGradientOpacity(0);
    setBottomGradientOpacity(1);
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Backdrop bg="rgba(0,0,0,0.9)" />
      <Dialog.Positioner placement="top">
        <Dialog.Content
          bg="#060010"
          border="1px solid #392e4e"
          rounded="xl"
          mx={4}
          w="full"
          maxW="720px"
        >
          <Dialog.Body padding="1em 1em .2em 1em">
            <InputGroup startElement={<Icon as={FiSearch} color="#B19EEF" fontSize='18px' />} mb={2}>
              <Input
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search the docs"
                variant="filled"
                bg="#060010"
                fontSize="lg"
                borderRadius="md"
                color="white"
                _focus={{ bg: "#060010", borderColor: "transparent" }}
                _hover={{ bg: "#060010" }}
                _placeholder={{ color: "#271E37" }}
              />
            </InputGroup>

            <AnimatePresence>
              {searchValue && (
                <motion.div
                  key="results"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <Box
                    mt={0}
                    borderTop="1px solid #392e4e"
                    position="relative"
                  >
                    <Box
                      ref={resultsRef}
                      maxH={400}
                      className="results-container"
                      overflowY="auto"
                      onScroll={handleScroll}
                    >
                      {results.length > 0 ? (
                        results.map((r, i) => {
                          const IconComp =
                            categoryIconMapping[r.categoryName] || FiSearch;
                          const selected = i === selectedIndex;
                          return (
                            <AnimatedResult
                              key={`${r.categoryName}-${r.componentName}-${i}`}
                              delay={0.05}
                              dataIndex={i}
                              onMouseEnter={() => setSelectedIndex(i)}
                              onClick={() => handleSelect(r)}
                            >
                              <Box
                                mt={i === 0 ? 4 : 2}
                                mr=".6em"
                                mb={2}
                                p="1em"
                                bg={selected ? "#392e4e" : "#271E37"}
                                rounded="xl"
                                display="flex"
                                alignItems="center"
                              >
                                <Box mr="16px">
                                  <IconComp size={24} color="#B19EEF" />
                                </Box>
                                <Box flex="1">
                                  <Text fontWeight="bold" fontSize="16px" color="white">
                                    {r.componentName}
                                  </Text>
                                  <Text fontSize="sm" color="#B19EEF">
                                    in {r.categoryName}
                                  </Text>
                                </Box>
                                <Box>
                                  <AiOutlineEnter size={20} color="#B19EEF" />
                                </Box>
                              </Box>
                            </AnimatedResult>
                          );
                        })
                      ) : (
                        <Text
                          textAlign="center"
                          mt={2}
                          color="#B19EEF"
                          p="1em"
                        >
                          No results found for{" "}
                          <span style={{ fontWeight: 900 }}>{searchValue}</span>
                        </Text>
                      )}
                    </Box>

                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      h="50px"
                      bg="linear-gradient(to bottom, #060010, transparent)"
                      pointerEvents="none"
                      style={{
                        transition: "opacity 0.3s",
                        opacity: topGradientOpacity,
                      }}
                    />
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      h="100px"
                      bg="linear-gradient(to top, #060010, transparent)"
                      pointerEvents="none"
                      style={{
                        transition: "opacity 0.3s",
                        opacity: bottomGradientOpacity,
                      }}
                    />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default SearchDialog;