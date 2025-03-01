function ImageInput({ imageLink, onUrlChange, onFileChange, isFileUploaded, isLinkProvided }) {
  return (
    <>
      <div>
        <label htmlFor="imageLink" className="block font-semibold text-gray-700 dark:text-gray-200">
          Image Link
        </label>
        <input
          type="text"
          id="imageLink"
          name="imageLink"
          value={imageLink}
          onChange={onUrlChange}
          className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
          disabled={isFileUploaded}
        />
      </div>

      <div>
        <label htmlFor="imageFile" className="block font-semibold text-gray-700 dark:text-gray-200">
          Image Upload
        </label>
        <input
          type="file"
          id="imageFile"
          name="image"
          onChange={onFileChange}
          className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
          disabled={isLinkProvided}
        />
      </div>
    </>
  );
}

export default ImageInput;
