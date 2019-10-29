## DB設計


## usersテーブル
|column|type|options|
|------|----|-------|
|name|string|null: false|
|address|string|null: false|
|pass|string|null: false|

## Association
_ has_many :groups_users
_ has_many :groups, through: :groups_users
_ has_many :comments

## groupsテーブル
|column|type|options|
|------|----|-------|
|group_name|string|null: false|

## Association
_ has_many :groups_users
_ has_many :users, through: :groups_users
_ has_many :comments

## groups_usersテーブル
|column|type|options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

## Association
_ belongs_to :group
_ belongs_to :user

## commentsテーブル
|column|type|options|
|------|----|-------|
|comment|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

## Association
_ belongs_to :group
_ belongs_to :user