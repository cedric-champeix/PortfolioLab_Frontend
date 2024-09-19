import { useEffect, useState } from 'react';
import axios from 'axios';
import { endpoints } from '../../../data/endpoints.ts';
import { Component } from '../../../types/entities/Component.ts';

export const useComponent = (projectId: string, _components: Component[]) => {
  const [components, setComponents] = useState<Component[]>(_components);

  const url = endpoints.componentsEndpoints(projectId);

  useEffect(() => {
    console.log('Reload...', components);
  }, [components]);

  const create = (body: { type: string, index: number, distance: number, data: object }) => {
    axios({
      url: url,
      method: 'POST',
      withCredentials: true,
      data: body,
    }).then((res) => {
        let newArr = [...components, res.data.component];

        if (res.data.indexUpdate)
          newArr = updateIndexes(newArr, res.data.indexes);

        newArr.sort((a, b) => a.index - b.index);
        setComponents(newArr);
      })
      .catch((error) => {
        console.error('Error when creating component: ', error);
      });
  };

  const update = (id: string, body: { type: string, data: object }) => {
    axios({
      url: `${url}/${id}`,
      method: 'PUT',
      withCredentials: true,
      data: body,
    }).then((res) => {
        let newArr = components.map((component) =>
          component.id === id ? res.data : component,
        );

        if (res.data.indexUpdate)
          newArr = updateIndexes(newArr, res.data.indexes);

        newArr.sort((a, b) => a.index - b.index);
        setComponents(newArr);
      })
      .catch((error) => {
        console.error('Error when updating component: ', error);
      });
  };

  const move = (id: string, body: { newIndex: number, distance: number }) => {
    axios({
      url: `${url}/${id}/move`,
      method: 'PUT',
      withCredentials: true,
      data: body,
    }).then((res) => {
        let newArr = components.map((component) =>
          component.id === id ? res.data.component : component,
        );

        if (res.data.indexUpdate)
          newArr = updateIndexes(newArr, res.data.indexes);

        newArr.sort((a, b) => a.index - b.index);
        setComponents(newArr);
      })
      .catch((error) => {
        console.error('Error when moving component: ', error);
      });
  };

  const remove = (id: string) => {
    axios({
      url: `${url}/${id}`,
      method: 'DELETE',
      withCredentials: true,
    }).then(() => {
        setComponents(
          components.filter((component) => {
            return component.id !== id;
          }),
        );
      })
      .catch((error) => {
        console.error('Error when deleting component: ', error);
      });
  };

  interface NewIndex {
    id: string,
    index: number
  }

  const updateIndexes = (arr: Component[], newIndexes: NewIndex[]) => {
    return arr.map((component) => {
      const index = newIndexes.find((newIndex) => {
        return newIndex.id === component.id;
      })?.index;

      if (index) {
        component.index = index;
      }

      return component;
    });
  };

  return { components, setComponents, create, update, move, remove };
};
