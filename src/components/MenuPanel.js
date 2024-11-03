import MenuButton from "./MenuButton";

function MenuPanel() {
  return (
    <div className="menu-panel">
      <MenuButton onClick={() => {}} disabled={false}>
        {"Dashboard"}
      </MenuButton>
      <MenuButton onClick={() => {}} disabled={false}>
        {"Deposit"}
      </MenuButton>
      <MenuButton onClick={() => {}} disabled={false}>
        {"Withdraw"}
      </MenuButton>
      <MenuButton onClick={() => {}} disabled={false}>
        {"Transfer"}
      </MenuButton>
      <MenuButton onClick={() => {}} disabled={false}>
        {"Loans"}
      </MenuButton>
      <MenuButton onClick={() => {}} disabled={false}>
        {"Payments"}
      </MenuButton>
      <MenuButton onClick={() => {}} disabled={false}>
        {"Open Account"}
      </MenuButton>
      <MenuButton onClick={() => {}} disabled={false}>
        {"Close Account"}
      </MenuButton>
    </div>
  );
}

export default MenuPanel;
