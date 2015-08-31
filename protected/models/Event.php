<?php

/**
 * This is the model class for table "events".
 *
 * The followings are the available columns in table 'events':
 * @property integer $id
 * @property string $start
 * @property string $end
 * @property string $place
 * @property integer $comment
 */
class Event extends ActiveRecord
{   
	public function tableName()
	{
		return 'event';
	}

	public function rules()
	{
		return array(
			array('start, end, place, comment', 'required'),
			array('place', 'length', 'max'=>150),
			array('start, end', 'safe'),

			array('id, start, end, place, comment', 'safe', 'on'=>'search'),
		);
	}

	public function relations()
	{
		return array(
            'user' => array(self::BELONGS_TO, 'User', 'user_id'),
		);
	}
}