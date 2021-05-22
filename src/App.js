import logo from './logo.svg';
import styles from './App.module.css';
import Marker from './components/marker/marker'
import html2canvas from "html2canvas";
import { useRef } from "react";;

const printDocument = (domElement) => {
  html2canvas(domElement).then((canvas) => {
    var a = document.createElement("a");
    // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
    a.href = canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
    a.download = "/somefilename.jpg";
    a.click();
    // document.body.appendChild(canvas);
  });
};


function App() {
    const canvasRef = useRef();

  return (
    <div className={styles['container']}>
      <Marker />
      <div className={styles['action']}>
        <button>Capature</button>
      </div>

      {/* <div ref={canvasRef} style={{ padding: 10, background: "#f5da55" }}>
        <h4 style={{ color: "#000" }}>Hello world!</h4>
      </div>
      <button onClick={() => printDocument(canvasRef.current)}>Print</button> */}
    </div>
  );
}

export default App;
