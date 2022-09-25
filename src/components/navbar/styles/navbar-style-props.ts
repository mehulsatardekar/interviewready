const inputGroupStyleProps = {
  w: "35%",
  display: {
    base: "none",
    md: "block",
    lg: "block",
    sm: "block",
  },
};

const headerStyleProps = {
  padding: "10px 1rem",
  w: "100%",
  height: "3.5rem",
  align: "center",
  justify: "space-between",
  direction: "row" as "row",
  position: "sticky" as "sticky",
  top: "0",
  zIndex: "10",
};

const logoTextProps = {
  as: "h2",
  fontSize: "2xl",
};

const searchbarStyleProps = {
  size: "md",
  bg: "#ECECEC",
  color: "black",
  fontFamily: "inter",
};
export { inputGroupStyleProps, headerStyleProps, logoTextProps, searchbarStyleProps };
