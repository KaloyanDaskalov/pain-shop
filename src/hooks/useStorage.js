import { useState, useEffect, useId } from "react";
import { serverTimestamp } from "@firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { bucketUrl } from "../firebase";

// storageRef events (put, on) ...

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const id = useId();

  useEffect(() => {
    const storageRef = ref(bucketUrl, `gallery/${file.name}-${id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setCreatedAt(serverTimestamp());
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, createdAt, error };
};

export default useStorage;
