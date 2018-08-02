import gql from "graphql-tag";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { compose, withHandlers, withState } from "recompose";

const StyledInput = styled.input`
  margin-top: 0.5rem;
  width: 100%;
`;

const AddComment = ({ isSubmitting, content, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <StyledInput
      disabled={isSubmitting}
      onChange={onChange}
      placeholder="Type a new comment..."
      required
      type="text"
      value={content}
    />
  </form>
);

export default compose(
  graphql(
    gql`
      mutation($comment: CommentInputType!) {
        addComment(comment: $comment) {
          id
          content
          pinned
          upvotesCount
          createdAt
          isFromProductOwner
          user {
            username
          }
          upvotes(currentUser: true) {
            id
          }
        }
      }
    `
  ),
  withState("content", "setContent", ""),
  withState("isSubmitting", "setIsSubmitting", false),
  withHandlers({
    onChange: ({ setContent }) => event => {
      setContent(event.target.value);
    },
    onSubmit: ({
      content,
      commentsData,
      mutate,
      productId,
      setContent,
      setIsSubmitting
    }) => event =>
      authGql(async () => {
        event.preventDefault();
        setIsSubmitting(true);
        const comment = { content, productId };
        const { data } = await mutate({ variables: { comment } });
        const newComment = data.addComment;
        setContent("");
        setIsSubmitting(false);
        commentsData.updateQuery(previousCommentsData => ({
          ...previousCommentsData,
          comments: [...previousCommentsData.comments, newComment]
        }));
      })
  })
)(AddComment);
