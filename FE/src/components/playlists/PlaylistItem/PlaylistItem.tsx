import React, { useEffect, useState } from "react";
import Props from "@/types";
import styles from "./PlaylistItem.module.css";
import Cover from "../Cover/Cover";
import Text from "../Text/Text";
import Icon from "@/components/icons";
import {
  motion,
  Reorder,
  MotionConfig,
  useAnimate,
  useDragControls,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {
  containerVariants,
  deleteButtonVariants,
  deleteLabelVariants,
  swipeableContainerVariant,
} from "./animationVariant";

import useMeasure from "react-use-measure";

type SongInfo = {
  title: string;
  artist: string;
  cover: string;
  id: number;
}

interface PlaylistItemProps extends Props {
  value: SongInfo;
  onRequestDelete: (id: number) => void;
}

const PlaylistItem = ({ value, onRequestDelete }: PlaylistItemProps) => {
  const { title, artist, cover, id  } = value;

  const [swipeAnimateRef, animateSwipe] = useAnimate();

  const swipeDragControls = useDragControls();
  const reorderDragControls = useDragControls();

  const [deleteButtonRef, { width: deleteButtonWidth }] = useMeasure();

  const itemX = useMotionValue(0);
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const deleteAnimateState = isDeleteShow ? "appear" : "disappear";

  useEffect(() => {
    itemX.on("change", (v) => {
      const isOverThreshold = v < -deleteButtonWidth / 2;

      setIsDeleteShow(isOverThreshold);
    });
  }, [itemX, deleteButtonWidth]);

  const handleDragEnd = () => {
    const isOverThreshold = itemX.get() < -deleteButtonWidth / 2;

    if (isOverThreshold) {
      animateSwipeToLeft();
    } else {
      animateSwipeToOrigin();
    }
  };

  const handleDraggableButtonPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (isDeleteShow) return;

    reorderDragControls.start(e);
  };

  const animateSwipeToLeft = () =>
    animateSwipe(swipeAnimateRef.current, { x: -deleteButtonWidth });

  const animateSwipeToOrigin = () =>
    animateSwipe(swipeAnimateRef.current, { x: 0 });

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.3 }}>
      <motion.div
        className={styles["container"]}
        exit="exit"
        variants={containerVariants}
      >
        <motion.div
          className={styles["delete-button"]}
          initial="disappear"
          animate={deleteAnimateState}
          variants={deleteButtonVariants}
          onClick={() => onRequestDelete(id)}
          ref={deleteButtonRef}
        >
          <motion.p
            className={styles["delete-label"]}
            variants={deleteLabelVariants}
          >
            삭제
          </motion.p>
        </motion.div>
        <motion.div
          className={styles['swipeable-container']}
          style={{ x: itemX }}
          variants={swipeableContainerVariant}
          drag="x"
          dragControls={swipeDragControls}
          dragListener={false}
          dragConstraints={{ left: -deleteButtonWidth, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          ref={swipeAnimateRef}
        >
          <Reorder.Item
            className={styles['playlist-item-inner']}
            value={value}
            dragControls={reorderDragControls}
            dragListener={false}
          >
          <div className={styles["item-left"]}>
            <Cover src={cover} alt="album-cover" />
            <div className={styles["text-box"]}>
              <Text content={title} type="title" />
              <Text content={artist} type="artist" />
            </div>
          </div>
          <button
              className={styles['draggable-button']}
              onPointerDown={handleDraggableButtonPointerDown}
            />
          </Reorder.Item>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

const formatDate = (duration: number) => {
  const min = Math.floor(duration / 60);
  const sec = duration % 60;

  return `${min}:${sec.toString().padStart(2, "0")}`;
};

export default PlaylistItem;
