<?php

class m120328_085408_base_db extends CDbMigration
{
	public function up()
	{
		$this->createTable('user', array (
			'id'             => 'pk',
			'fname'          => 'string',
			'lname'          => 'string',
			'username'       => 'string',
			'password'       => 'string',
			'pw_reset_token' => 'string',
			'email'          => 'string',
			'role'           => 'string',
			'is_deleted'     => 'int',
			'create_date'    => 'datetime',
		), 'ENGINE=InnoDB');

		$this->createTable('cookie', array (
			'id'          => 'pk',
			'username'    => 'string',
			'token'       => 'string',
			'create_date' => 'datetime',
		), 'ENGINE=InnoDB');

		$this->createTable('event', array (
			'id'             => 'pk',
            'user_id'        => 'int',
			'place'          => 'string',
			'start'          => 'datetime',
			'end'            => 'datetime',
            'comment'        => 'text',
			'create_date'    => 'datetime',
		), 'ENGINE=InnoDB');
        
        //---Add users
        
		$password = UserIdentity::crypt('1111');// => md5('1111'.UserIdentity::$salt);
        
		$this->insert('user', array (
			'fname'          => 'Admin',
			'lname'          => 'Adminovich',
			'username'       => 'admin',
			'password'       => $password,
			'pw_reset_token' => '',
			'email'          => 'admin@admin.loc',
			'role'           => 'admin',
			'is_deleted'     => 0,
			'create_date'    => new CDbExpression('NOW()'),
		));
		$adminId = Yii::app()->db->getLastInsertId();
        
        $this->insert('user', array (
			'fname'          => 'User',
			'lname'          => 'Userovich',
			'username'       => 'user',
			'password'       => $password,
			'pw_reset_token' => '',
			'email'          => 'user@user.loc',
			'role'           => 'user',
			'is_deleted'     => 0,
			'create_date'    => new CDbExpression('NOW()'),
		));
		$userId = Yii::app()->db->getLastInsertId();
		
        //--- Add base event
        	
		$this->insert('event', array(
            'user_id'        => $userId,
			'place'          => 'Italia',
			'start'          => new CDbExpression('NOW() - INTERVAL 1 DAY'),
			'end'            => new CDbExpression('NOW() + INTERVAL 2 DAY'),
			'comment'        => 'Unitary state',
			'create_date'    => new CDbExpression('NOW()'),
		));
        
        $this->insert('event', array(
            'user_id'        => $userId,
			'place'          => 'Francia',
			'start'          => new CDbExpression('NOW() + INTERVAL 3 DAY'),
			'end'            => new CDbExpression('NOW() + INTERVAL 7 DAY'),
			'comment'        => 'I want romance!',
			'create_date'    => new CDbExpression('NOW()'),
		));
        
        $this->insert('event', array(
            'user_id'        => $userId,
			'place'          => 'Mexico',
			'start'          => new CDbExpression('NOW()  + INTERVAL 10 DAY'),
			'end'            => new CDbExpression('NOW() + INTERVAL 15 DAY'),
			'comment'        => 'I <3 TEQUILA',
			'create_date'    => new CDbExpression('NOW()'),
		));
        
        $this->insert('event', array(
            'user_id'        => $userId,
			'place'          => 'Ukraine',
			'start'          => new CDbExpression('NOW() - INTERVAL 20 DAY'),
			'end'            => new CDbExpression('NOW() - INTERVAL 15 DAY'),
			'comment'        => 'Oh... We want the European Union...',
			'create_date'    => new CDbExpression('NOW()'),
		));
        
        $this->insert('event', array(
            'user_id'        => $userId,
			'place'          => 'USA',
			'start'          => new CDbExpression('NOW()'),
			'end'            => new CDbExpression('NOW() + INTERVAL 10 DAY'),
			'comment'        => 'O say, can you see, by the dawn’s early light...',
			'create_date'    => new CDbExpression('NOW()'),
		));
        
        $this->insert('event', array(
            'user_id'        => $userId,
			'place'          => 'Russia',
			'start'          => new CDbExpression('NOW() - INTERVAL 7 DAY'),
			'end'            => new CDbExpression('NOW() - INTERVAL 3 DAY'),
			'comment'        => 'I would drink vodka with a bear on unicycle',
			'create_date'    => new CDbExpression('NOW()'),
		));
	}

	public function down()
	{
		$this->dropTable('user');
		$this->dropTable('cookie');
		$this->dropTable('event');
	}
}
