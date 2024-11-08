function MenuButton({ children, isActive, dispatch }) {
  //on button click dispatch ACTIVESCREEN useReducer case to change active screen
  const handleOnClick = (val) => {
    dispatch({
      type: "ACTIVESCREEN",
      payload: val.toLowerCase().match(/^([^ ]+)/)[0],
    });
  };
  return (
    <button
      className="btn_menu"
      onClick={() => handleOnClick(children)}
      disabled={isActive}
    >
      {children}
    </button>
  );
}

export default MenuButton;
