import { useRef, useEffect } from 'react';

const useFocusControl = ({ onLoad }) => {
  const ref = useRef();
  const focusElement = () => ref.current && ref.current.focus();
  useEffect(() => {
    if (onLoad) {
      focusElement();
    }
  }, [onLoad]);

  return [ref, focusElement];
};

export default useFocusControl;
