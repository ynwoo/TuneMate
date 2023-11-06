import React from "react";
import Props from "@/types";
import { RecommendationFriend } from "@/types/social";

interface RecommendItemProps extends Props {
  item: RecommendationFriend;
}

const RecommendationItem = ({ item }: RecommendItemProps) => {
  return <div>{item.name}</div>;
};

export default RecommendationItem;
