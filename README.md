## DB設計


## usersテーブル
|column|type|options|
|------|----|-------|
|name|string|null: false, index: true|
|address|string|null: false|
|pass|string|null: false|

## Association
_ has_many :groups_users
_ has_many :groups, through: :groups_users
_ has_many :comments

## groupsテーブル
|column|type|options|
|------|----|-------|
|name|string|null: false|

## Association
_ has_many :groups_users
_ has_many :users, through: :groups_users
_ has_many :comments

## groups_usersテーブル
|column|type|options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

## Association
_ belongs_to :group
_ belongs_to :user

## commentsテーブル
|column|type|options|
|------|----|-------|
|comment|string|
|image|string|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

## Association
_ belongs_to :group
_ belongs_to :user