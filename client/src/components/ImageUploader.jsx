import React, { useState } from "react";
import { Form, Spinner, Image } from "react-bootstrap";
import axios from "axios";

const ImageUploader = ({ onUploadSuccess, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || "");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "productos_preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/djwgfo8n0/image/upload",
        formData,
      );

      const url = res.data.secure_url;
      setPreview(url);
      onUploadSuccess(url); 
    } catch (error) {
      console.error("Error subiendo imagen:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Imagen del Producto</Form.Label>
      <div className="d-flex align-items-center gap-3">
        {preview && (
          <Image
            src={preview}
            thumbnail
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        )}
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {uploading && <Spinner animation="border" size="sm" />}
      </div>
      {uploading && (
        <Form.Text className="text-primary">Subiendo a Cloudinary...</Form.Text>
      )}
    </Form.Group>
  );
};

export default ImageUploader;
