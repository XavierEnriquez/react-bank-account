import MenuButton from "./MenuButton";

function MenuPanel({ dispatch, isActive }) {
  return (
    <div className="menu-panel">
      <MenuButton dispatch={dispatch} isActive={!isActive}>
        {"Open Account"}
      </MenuButton>
      {/* <MenuButton dispatch={dispatch} isActive={isActive}>
        {"Dashboard"}
      </MenuButton> */}
      <MenuButton dispatch={dispatch} isActive={isActive}>
        {"Deposits"}
      </MenuButton>
      <MenuButton dispatch={dispatch} isActive={isActive}>
        {"Withdrawals"}
      </MenuButton>
      <MenuButton dispatch={dispatch} isActive={isActive}>
        {"Loans"}
      </MenuButton>
      <MenuButton dispatch={dispatch} isActive={isActive}>
        {"Payments"}
      </MenuButton>
      <MenuButton dispatch={dispatch} isActive={isActive}>
        {"Close Account"}
      </MenuButton>
    </div>
  );
}

export default MenuPanel;
