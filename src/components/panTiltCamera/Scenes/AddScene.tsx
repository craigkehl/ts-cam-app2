import React, { useRef } from 'react';

import { useStore } from '../../../store/store';
import { SceneState } from '../../../store/scenes-store';
import Input from '../../UI/Input';
import Card from '../../UI/Card';

import classes from './AddScene.module.css';

const AddScene: React.FC<{ className?: string }> = (props) => {
  const [globalState, dispatch] = useStore();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLInputElement>(null);

  const addSceneHandler = () => {
    if (nameInputRef.current?.value && descInputRef.current?.value) {
      const name = nameInputRef.current?.value;
      const description = descInputRef.current?.value;

      if (
        !globalState.scenes.some(
          (object: { name: string }) => object.name === name
        )
      ) {
        const newScene: SceneState = {
          name,
          description,
          isShow: false,
          isCurrent: false,
        };
        dispatch('ADD_SCENE', newScene);
      } else {
        // TODO: create error handler
        console.log('Scene already exists');
      }
    }
  };

  return (
    <Card>
      <h3 className={`${classes.h3} ${props.className}`}>Add A New Scene</h3>
      <form className={`${classes.form} ${props.className}`}>
        <Input
          ref={nameInputRef}
          label='Name'
          input={{
            id: 'name',
            type: 'text',
          }}
        />
        <Input
          ref={descInputRef}
          label='Description'
          input={{
            id: 'description',
            type: 'text',
          }}
        />
          <button type='button' onClick={addSceneHandler}>
            + Add
          </button>
      </form>
    </Card>
  );
};

export default AddScene;
