import React, { useCallback, useMemo } from "react";
import {
  HStack,
  Pressable,
  Text,
  View,
  VStack,
} from "@src/components/common/Gluestack";
import {
  selectSettings,
  selectThemeOptions,
} from "@src/slices/settings/settingsSlice";
import { useAppSelector } from "@root/store";
import { useWindowDimensions } from "react-native";

import { useRoute } from "@react-navigation/core";
import useFeedItem from "../../../../../hooks/feeds/useFeedItem";
import {
  ExtensionType,
  getBaseUrl,
  getLinkInfo,
} from "../../../../../helpers/LinkHelper";
import CompactFeedItemThumbnail from "./CompactFeedItemThumbnail";
import CompactFeedItemVote from "./CompactFeedItemVote";
import CompactFeedItemFooter from "./CompactFeedItemFooter";

import { fontSizeMap } from "../../../../../theme/fontSize";
import { VoteOption } from "../../../../common/SwipeableRow/VoteOption";
import { ReplyOption } from "../../../../common/SwipeableRow/ReplyOption";
import { SwipeableRow } from "../../../../common/SwipeableRow/SwipeableRow";
import { ILemmyVote } from "../../../../../types/lemmy/ILemmyVote";
import { useFeedPost } from "../../../../../stores/feeds/feedsStore";
import { Box } from "../../../../common/Gluestack";

function CompactFeedItem({ postId }: { postId: number }) {
  const {
    compactThumbnailPosition,
    compactShowVotingButtons,
    fontWeightPostTitle,
  } = useAppSelector(selectSettings);
  const { key } = useRoute();

  const feedItem = useFeedItem(postId);
  const post = useFeedPost(key, postId);

  const theme = useAppSelector(selectThemeOptions);

  const onSwipe = useCallback(
    (value: ILemmyVote) => {
      feedItem.onVotePress(value, false).then();
    },
    [postId]
  );

  const leftOption = useMemo(
    () => <VoteOption onVote={onSwipe} vote={post.my_vote} />,
    [post.my_vote, postId]
  );

  const rightOption = useMemo(
    () => (
      <ReplyOption
        onReply={feedItem.doReply}
        onExtra={feedItem.doSave}
        extraType="save"
      />
    ),
    [postId, post.saved]
  );

  // TODO: Disabling Font Scaling for now;
  // const { fontSize, isSystemTextSize } = useAppSelector(selectSettings);
  const fontSize = 2;
  const isSystemTextSize = false;

  const { fontScale } = useWindowDimensions();
  const fontModifier = fontSizeMap[fontSize];
  const FONT_SIZE = isSystemTextSize ? 15 / fontScale : 15 + fontModifier;

  const linkInfo = getLinkInfo(post.post.url);
  const showLink =
    linkInfo.extType === ExtensionType.VIDEO ||
    linkInfo.extType === ExtensionType.GENERIC;

  return (
    <View flex={1} my="$0.5">
      <SwipeableRow leftOption={leftOption} rightOption={rightOption}>
        <Pressable onPress={feedItem.onPress}>
          <HStack
            flex={1}
            px="$2"
            py="$1"
            backgroundColor={theme.colors.fg}
            space="sm"
          >
            {compactThumbnailPosition === "Left" && (
              <CompactFeedItemThumbnail
                post={post}
                linkInfo={feedItem.linkInfo}
                setPostRead={() => {}}
              />
            )}

            <VStack flex={1}>
              <Text
                flex={1}
                fontSize={FONT_SIZE}
                fontWeight={fontWeightPostTitle}
                color={
                  post.read
                    ? theme.colors.textSecondary
                    : theme.colors.textPrimary
                }
              >
                {post.post.name}{" "}
                {showLink && (
                  <Text
                    fontSize={FONT_SIZE - 1}
                    color={theme.colors.textSecondary}
                  >
                    ({getBaseUrl(linkInfo.link, true)})
                  </Text>
                )}
              </Text>

              <CompactFeedItemFooter post={post} />
            </VStack>

            {compactThumbnailPosition === "Right" && (
              <VStack alignItems="flex-start">
                <CompactFeedItemThumbnail
                  post={post}
                  linkInfo={feedItem.linkInfo}
                  setPostRead={() => {}}
                />
              </VStack>
            )}

            {compactShowVotingButtons && (
              <CompactFeedItemVote
                myVote={post.my_vote as ILemmyVote}
                onVotePress={feedItem.onVotePress}
              />
            )}
            {post.saved && (
              <Box
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "transparent",
                  width: 0,
                  height: 0,
                  borderTopColor: theme.colors.bookmark,
                  borderTopWidth: 15,
                  borderLeftWidth: 15,
                  borderLeftColor: "transparent",
                }}
              />
            )}
          </HStack>
        </Pressable>
      </SwipeableRow>
    </View>
  );
}

export default React.memo(CompactFeedItem);
