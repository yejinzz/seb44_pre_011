package com.district11.stackoverflow.answer.dto;

import com.district11.stackoverflow.answer.entity.Answer;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AnswerResponseDto {
    private long memberId;
    private long questionId;

    private long answerId;

    private String displayName;

    private long answerVoteCount;
    private String content;

    private Answer.AnswerStatus answerStatus;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}
