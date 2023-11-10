package kr.co.tunemate.tunemategroupservice.service;

public interface GroupParticipationRequestService {
    void saveGroupParticipationRequest(String userId, String groupId);
    void acceptGroupParticipationRequest(String userId, String groupParticipationRequestId);
    void denyGroupParticipationRequest(String userId, String groupParticipationRequestId);
}
