import React, { useState } from "react";
import Navbar from "@/components/navbar";

const styles = [
  {
    id: "yanjun",
    name: "Yanjun",
    imageUrl: "/examples/yanjun.png",
  },
  {
    id: "fushigi",
    name: "Fushigi",
    imageUrl: "/examples/fushigi.jpg",
  },
  {
    id: "disney",
    name: "Disney",
    imageUrl: "/examples/disney.jpg",
  },
  {
    id: "caricature",
    name: "Caricature",
    imageUrl: "/examples/cari.png",
  },
  {
    id: "arcane",
    name: "Arcane",
    imageUrl: "/examples/arcane.png",
  },
  {
    id: "comic",
    name: "Comic",
    imageUrl: "/examples/comic.jpg",
  },
  {
    id: "metfaces",
    name: "Metfaces",
    imageUrl: "/examples/metfaces.png",
  },
  {
    id: "sharandula",
    name: "Sharandula",
    imageUrl: "/examples/sharandula.png",
  },
];

export default function Generate() {
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [styleImage, setStyleImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleContentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setContentImage(e.target.files[0]);
    }
  };

  const handleStyleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStyleImage(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedImageUrl = await styleTransfer();
      if (generatedImageUrl) {
        setGeneratedImage(generatedImageUrl);
        setHistory([...history, generatedImageUrl]);
      }
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const styleTransfer = async () => {
    if (!contentImage || !styleImage) return;

    const formData = new FormData();
    formData.append("content", contentImage);
    formData.append("style", styleImage);

    try {
      const response = await fetch(
        "http://localhost:3000/api/style_transfer_w_cn_ipa_lcm",
        {
          method: "POST",
          body: formData,
          mode: "cors",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } catch (error) {
      console.error("Error sending images to server:", error);
      throw error;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-3/12 p-6 bg-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            上传图片并选择风格
          </h2>
          <div className="mb-6">
            <label
              htmlFor="contentImageInput"
              className="block text-gray-800 mb-2 text-center"
            >
              内容图
            </label>
            <div
              className="w-full p-2 border cursor-pointer text-center bg-gray-200"
              onClick={() =>
                document.getElementById("contentImageInput")?.click()
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("contentImageInput")?.click();
                }
              }}
            >
              <div className="w-full aspect-square flex items-center justify-center">
                {contentImage ? (
                  <img
                    src={URL.createObjectURL(contentImage)}
                    alt="Content"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <img
                    src="/ui/upload_image.png"
                    alt="Upload Content"
                    className="w-16 h-16"
                  />
                )}
              </div>
            </div>
            <input
              type="file"
              id="contentImageInput"
              onChange={handleContentImageChange}
              className="hidden"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="styleImageInput"
              className="block text-gray-800 mb-2 text-center"
            >
              风格图
            </label>
            <div
              className="w-full p-2 border cursor-pointer text-center bg-gray-200"
              onClick={() =>
                document.getElementById("styleImageInput")?.click()
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("styleImageInput")?.click();
                }
              }}
            >
              <div className="w-full aspect-square flex items-center justify-center">
                {styleImage ? (
                  <img
                    src={URL.createObjectURL(styleImage)}
                    alt="Style"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <img
                    src="/ui/upload_image.png"
                    alt="Upload Style"
                    className="w-16 h-16"
                  />
                )}
              </div>
            </div>
            <input
              type="file"
              id="styleImageInput"
              onChange={handleStyleImageChange}
              className="hidden"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">选择预置风格</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {styles.map((style) => (
                <button
                  key={style.id}
                  className={`block w-full aspect-square rounded-lg border-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    selectedStyle === style.id
                      ? "border-indigo-300"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedStyle(style.id);
                    fetch(style.imageUrl)
                      .then((res) => res.blob())
                      .then((blob) => {
                        const file = new File([blob], style.name, {
                          type: blob.type,
                        });
                        setStyleImage(file);
                      });
                  }}
                  type="button"
                >
                  <img
                    src={style.imageUrl}
                    alt={style.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleGenerate}
              className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
              disabled={isGenerating}
            >
              {isGenerating ? "处理中..." : "生成"}
            </button>
          </div>
          <div className="flex justify-between space-x-4 mt-4">
            <button className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200">
              下载
            </button>
          </div>
        </div>
        <div className="lg:w-4/6 p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-6 text-gray-800">预览与操作</h2>
          <div className="mb-6">
            <div className="border border-gray-300 rounded-lg p-4">
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full mb-4"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">生成的图像将显示在这里</span>
                </div>
              )}
            </div>
          </div>
          {isGenerating && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full animate-pulse"
                style={{ width: "50%" }}
              ></div>
            </div>
          )}
          {generatedImage && <div className="mt-4 flex space-x-4"></div>}
        </div>
        <div className="lg:w-1/12 p-6 bg-gray-200">
          <h2 className="text-md font-bold mb-6 text-gray-800">历史记录</h2>
          {history.map((image, index) => (
            <div key={`${image}-${index}`} className="w-24 h-24">
              <img
                src={image}
                alt="History"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
          <button
            className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
            onClick={() => setHistory([])}
          >
            清除记录
          </button>
        </div>
      </div>
    </div>
  );
}
