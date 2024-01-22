CREATE TABLE event (
    id                BIGINT,
    name              VARCHAR(100),
    description       VARCHAR(500),
    start_datetime    DATETIME,
    end_datetime      DATETIME,
    capacity          INT,
    CONSTRAINT pk_event PRIMARY KEY(id)
);

CREATE TABLE user (
    -- UserはメアドをIDにしてもらう。
    -- Google認証であればgmailを
    -- アカウント手動登録であればそのメアドを
    email       VARCHAR(300),
    created_at  DATETIME,
    CONSTRAINT pk_user PRIMARY KEY(email)
);

CREATE TABLE organizer (
    -- 主催者が1メアドで複数アカウントを作りたいかも？
    -- なので IDはメアド以外にする。
    id          VARCHAR(300),
    name        VARCHAR(100),
    email       VARCHAR(300),
    created_at  DATETIME,
    CONSTRAINT pk_user PRIMARY KEY(id)
);
