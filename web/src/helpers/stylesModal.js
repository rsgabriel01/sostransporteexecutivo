export default function stylesModalJson(theme) {
  return {
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 5, 3),
      width: "70%",
      height: "80%",
    },
  };
}
