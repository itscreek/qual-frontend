import { getLogs } from "~/utils/log";
import  { IoMdDownload } from "react-icons/io";

export default function DownloadBox() {
    function download() {
      const blob = new Blob([JSON.stringify(getLogs())], {
        type: "application/json",
      });
      let downloadLink = document.createElement("a");
      downloadLink.download = "log.json";
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.click();
    }
    return (
      <div className="download-box">
        <button onClick={download}><IoMdDownload /></button>
      </div>
    );
  }