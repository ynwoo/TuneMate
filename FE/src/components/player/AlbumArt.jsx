import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/styles/AlbumArt.module.css";
import styles from "@/styles/AlbumArt.module.css";

const AlbumArt = ({ trackImg }) => {
  const contentWrapElement = document.querySelector(`.${styles.contentWrap}`);

  if (contentWrapElement) {
    // 요소가 존재하면 스타일 변경
    contentWrapElement.style.background = `linear-gradient(120deg, ${bgArray[pageNum][0]}, ${bgArray[pageNum][1]})`;
  } else {
    console.error("Content wrap element not found");
  }

  const [pageNum, setPageNum] = useState(0);
  const totalNum = 3;

  const bgArray = [
    ["#0272a4", "#f6a564"],
    ["#b6bfc8", "#36595b"],
    ["#e58e82", "#6f569f"],
  ];

//   const pageChangeFunc = () => {
//     document.querySelector(
//       `.${styles.contentWrap}`
//     ).style.background = `linear-gradient(120deg, ${bgArray[pageNum][0]}, ${bgArray[pageNum][1]})`;

    document.querySelectorAll(".album").forEach((album, index) => {
      if (pageNum === index) {
        album.classList.add("active");
      } else {
        album.classList.remove("active");
      }
    });

    const diskInnerElement = document.querySelector(".disk_inner");
    if (diskInnerElement) {
      diskInnerElement.style.background = bgArray[pageNum][0];
    }
  };

  useEffect(() => {
    pageChangeFunc();
  }, [pageNum]);

  const handlePrevClick = () => {
    setPageNum((prevPageNum) =>
      prevPageNum > 0 ? prevPageNum - 1 : totalNum - 1
    );
  };

  const handleNextClick = () => {
    setPageNum((prevPageNum) =>
      prevPageNum < totalNum - 1 ? prevPageNum + 1 : 0
    );
  };

  return (
    <div>
      <article className="contentWrap">
        {/* 이미지 표시 부분 */}
        <div className="album">
          <div className={styles.coverImg}>
            <Image src={trackImg} alt="Album Art" width={200} height={200} />
          </div>
        </div>
      </article>

      <div className="buttonWrap">
        {/* <button type="button" onClick={handlePrevClick}>
          PREV
        </button> */}
        <ul className="pointWrap">
          <div></div>
          {[...Array(totalNum)].map((_, index) => (
            <li key={index} className={pageNum === index ? "active" : ""}></li>
          ))}
        </ul>
        {/* <button type="button" onClick={handleNextClick}>
          NEXT
        </button> */}
      </div>
    </div>
  );
};

export default AlbumArt;
