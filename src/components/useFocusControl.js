import { useRef, useEffect } from 'react';

const useFocusControl = () => {
  const ref = useRef();
  const focusElement = () => ref.current && ref.current.focus();
  useEffect(() => {
    focusElement();
  }, []);

  return [ref, focusElement];
};

export default useFocusControl;
