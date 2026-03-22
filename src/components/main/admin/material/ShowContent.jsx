import { useContext } from "react";
import { userAuth } from "../../../../context/StudyGuide";

function ShowContent() {
  const { url } = useContext(userAuth);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <iframe
        src={url}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="PDF Viewer"
      />
    </div>
  );
}

export default ShowContent;