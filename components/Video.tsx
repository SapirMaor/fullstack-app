import { useState, useEffect } from "react";

const Video: React.FC<{ publicId: string }> = ({ publicId }) => {
    const [videoPublicId, setPublicId] = useState(publicId);
    useEffect(() => {
      setPublicId(publicId);
    }, [publicId]);
    if (!videoPublicId) {
        return <></>;
    }

    return (
      <video
        className={`${videoPublicId == "" ? "hidden" : "block m-4"}`}
        autoPlay
        controls
        muted
        src={`https://res.cloudinary.com/dschr6ogm/video/upload/v${videoPublicId.slice(0,10)}/${videoPublicId}.mp4`}
        style={{ width: "500px", height: "300px" }}
      ></video>
    );
};
export default Video;
