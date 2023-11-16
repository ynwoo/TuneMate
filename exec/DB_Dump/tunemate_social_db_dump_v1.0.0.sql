INSERT INTO SOCIAL.chat (user_id,relation_id_id) VALUES
	 ('2',5);
INSERT INTO SOCIAL.chat_person (user_id,friend_id) VALUES
	 ('43d70548-f69f-44cb-85f7-ad9b1e05f909',13),
	 ('6ba84974-2757-458d-bde9-ae43425e45fe',13);
INSERT INTO SOCIAL.friend (host,user1id,user2id,common_playlist_id,distance,musical_taste_similarity) VALUES
	 ('43d70548-f69f-44cb-85f7-ad9b1e05f909','8c6bbec6-921f-4b03-a2ba-500106abd833','43d70548-f69f-44cb-85f7-ad9b1e05f909','7A7Hp7DwkrFby3vyg2vU83','230m','84%'),
	 ('43d70548-f69f-44cb-85f7-ad9b1e05f909','2','4','0yunmWm6CKAxe8vMOjMPq5','50','50'),
	 ('2','5','2','12324222','50','50'),
	 (NULL,'43d70548-f69f-44cb-85f7-ad9b1e05f909','cb899bc8-33a9-43a6-938c-76b0ec286c77',NULL,'100','0.50709255283711'),
	 ('cb899bc8-33a9-43a6-938c-76b0ec286c77','cb899bc8-33a9-43a6-938c-76b0ec286c77','ab1b4b7f-abb2-4bf1-920f-b437233b4f47','6QVjNThqPfUF3203pQ05AS','100','0.034503277967117704'),
	 ('cb899bc8-33a9-43a6-938c-76b0ec286c77','cb899bc8-33a9-43a6-938c-76b0ec286c77','23cb91d3-78ac-45b0-995a-38f8bd348dff','0q8tTOGtumTIzOfu8a9D7p','100','0.03806934938134405'),
	 ('23cb91d3-78ac-45b0-995a-38f8bd348dff','23cb91d3-78ac-45b0-995a-38f8bd348dff','ab1b4b7f-abb2-4bf1-920f-b437233b4f47','7Ge1clQ4QeDenMJsORMQss','100','0.03857583749052298'),
	 ('6ba84974-2757-458d-bde9-ae43425e45fe','6ba84974-2757-458d-bde9-ae43425e45fe','43d70548-f69f-44cb-85f7-ad9b1e05f909','2Y7tFYXmjaR8rffYpz8c3N',NULL,'undefined');
INSERT INTO SOCIAL.friend_request (requested_user_id,requesting_user_id,distance,musical_taste_similarity) VALUES
	 ('string','43d70548-f69f-44cb-85f7-ad9b1e05f909','string','string'),
	 ('3','4','230m','84%');
