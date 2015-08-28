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
    public $username;
    public $user_id;
    
	public function tableName()
	{
		return 'event';
	}

	public function rules()
	{
		return array(
			array('start, end, place, comment', 'required'),
			array('place', 'length', 'max'=>150),
			array('start_ts, end_ts', 'safe'),

			array('id, start, end, place, comment', 'safe', 'on'=>'search'),
		);
	}

	public function relations()
	{
		return array(
            'user' => array(self::BELONGS_TO, 'User', 'user_id'),
		);
	}

    /*protected function afterFind()
    {
        parent::afterFind();
        $this->username = $this->user->username;
        $this->user_id  = $this->user->id;
    }*/
}