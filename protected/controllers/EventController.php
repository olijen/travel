<?php

class EventController extends Controller
{
	public function accessRules()
	{
		return array_merge(
			array(array('allow',
				'actions' => array('read', 'list', 'create', 'update', 'delete'),
				'users' => array('@')
			)),
			parent::accessRules()
		);
	}

	public function actionRead($id)
	{
		if (null === ($model = Event::model()->findByPk($id)))
			throw new CHttpException(404);
		$this->sendResponse(200, CJSON::encode($model));
	}
    
    public function actionList()
	{
	    //TODO: find only current user events 'user_id='.Yii::app()->user->id
        //if (Yii::app()->user->isGuest) $this->sendResponse(401);
        $condition = $this->isUser ?
            'user_id='.Yii::app()->user->id : '1=1';
		$models = Event::model()->findAll($condition);
		$this->sendResponse(200, CJSON::encode($models));
	}

	public function actionCreate()
	{
		$model = new Event();
		$model->setAttributes($this->getJsonInput());
		if (!$model->validate()) {
			$this->sendResponse(400, CHtml::errorSummary($model));
		} else if (!$model->save(false)) {
			throw new CException('Cannot create a record');
		}
		$model->refresh();
		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionUpdate($id)
	{
		if (null === ($model = Event::model()->findByPk($id)))
			throw new CHttpException(404);
		$model->setAttributes($this->getJsonInput());
		if (!$model->validate()) {
			$this->sendResponse(400, CHtml::errorSummary($model));
		} else if (!$model->save(false)) {
			throw new CException('Cannot update a record');
		}
		$model->refresh();
		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionDelete($id)
	{
		if (null === ($model = Event::model()->findByPk($id)))
			throw new CHttpException(404);
		if (!$model->delete())
			throw new CException('Cannot delete event');
	}
}
