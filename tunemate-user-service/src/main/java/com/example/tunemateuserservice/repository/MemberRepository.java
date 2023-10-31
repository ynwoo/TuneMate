package com.example.tunemateuserservice.repository;

import com.example.tunemateuserservice.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
