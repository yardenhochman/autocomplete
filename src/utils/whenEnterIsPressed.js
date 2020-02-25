const whenEnterIsPressed = fn => ({ which }) => which === 13 && fn();

export default whenEnterIsPressed;
