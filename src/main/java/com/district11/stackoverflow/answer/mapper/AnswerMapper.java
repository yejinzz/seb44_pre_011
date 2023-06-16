package com.district11.stackoverflow.answer.mapper;

import com.district11.stackoverflow.answer.dto.AnswerPatchDto;
import com.district11.stackoverflow.answer.dto.AnswerPostDto;
import com.district11.stackoverflow.answer.dto.AnswerResponseDto;
import com.district11.stackoverflow.answer.entity.Answer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")      // @Mapper : mapper 자동으로 생성해줌
public interface AnswerMapper {         // mapper : SQL을 호출하기 위한 인터페이스

    Answer AnswerPostDtoToAnswer(AnswerPostDto answerPostDto);
    Answer AnswerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
    AnswerResponseDto AnswerToAnswerResponseDto(Answer answer);

    // 만약에 답변의 댓글이 필요하면 List 추가
}
