import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useState } from 'react';

export type UseSelection<U> = {
  /**
   * A Map of all selected items with `true` value.
   */
  selected: Map<U, boolean>,
  /**
   * Total length of selected items, `0` if there is no item selected
   */
  length: number,
  /**
   * Adds a provided `id` into selected items.
   * @param id The id to add into selected items.
   */
  select: (id: U) => void,
  /**
   * Removes a provided `id` from selected items.
   * @param id The id to remove from selected items.
   */
  deselect: (id: U) => void,
  /**
   * Returns an array of all selected items.
   */
  getSelection: () => U[],
  /**
   * Returns `true` if the provided id is selected before.
   * @param id The id to check whether it is in selected ones or not.
   */
  isSelected: (id: U) => boolean,
  /**
   * Removes all selected items from the list.
   */
  clear: () => void,
  /**
   * Adds multiple ids at once.
   * @param ids Array of ids to add into selected items.
   */
  selectBulk: (ids: U[]) => void,
  /**
   * Removes multiple ids at once.
   * @param ids Array of ids to remove from selected items.
   */
  deselectBulk: (ids: U[]) => void,
  /**
   * With this method, you can define the reference items to check selected ones with.
   * @param ids Array of ids to define reference items.
   */
  setReference: (ids: U[]) => void,
  /**
   * Returns required props to bind a checkbox to this state.
   */
  checkBoxProps: (id: U) => {
    checked: boolean,
    onChange: (e: CheckboxChangeEvent) => void,
  },
  /**
   * Returns required props to bind the bulk select checkbox to the state.
   */
  bulkCheckboxProps: {
    checked: boolean,
    indeterminate: boolean,
    onChange: (e: CheckboxChangeEvent) => void,
  },
};
/**
 * A hook to manage multiple selections. despite of using simple arrays to store selected Items
 * which makes the cost of retrieving of selected item of O(n), you can do that with this hook with O(1).
 */
export const useSelection = <T = any>(): UseSelection<T> => {
  const [reference, setReference] = useState<T[]>([]);
  const [selected, setSelected] = useState<Map<T, boolean>>(new Map());
  const [complement, setComplement] = useState<Map<T, boolean>>(new Map());

  const _delete = (state: Map<T, boolean>, ids: T[]): Map<T, boolean> => {
    const tempState = new Map(state);
    for (const id of ids) {
      tempState.delete(id);
    }
    return tempState;
  };

  const _set = (state: Map<T, boolean>, ids: T[]): Map<T, boolean> => {
    const tempState = new Map(state);
    for (const id of ids) {
      tempState.set(id, true);
    }
    return tempState;
  };

  const handleSetReference = (ids: T[]) => {
    setReference(ids);
    setComplement(prev => {
      prev.clear();
      for (const id of ids) {
        if (!selected.has(id)) {
          prev.set(id, true);
        }
      }
      return prev;
    });
  };

  const select = (id: T) => {
    setSelected(prev => _set(prev, [id]));
    setComplement(prev => _delete(prev, [id]));
  };

  const deselect = (id: T) => {
    setSelected(prev => _delete(prev, [id]));
    setComplement(prev => _set(prev, [id]));
  };

  const clear = () => {
    setSelected(prev => { prev.clear(); return prev; });
    setComplement(prev => _set(prev, reference));
  };

  const isSelected = (id: T) => {
    return selected.has(id);
  };

  const getSelection = () => {
    return Array.from(selected.keys());
  };

  const selectBulk = (ids: T[]) => {
    setSelected(prev => _set(prev, ids));
    setComplement(prev => _delete(prev, ids));
  };

  const deselectBulk = (ids: T[]) => {
    setSelected(prev => _delete(prev, ids));
    setComplement(prev => _set(prev, ids));
  };

  const bulkCheckboxChecked = () => {
    return reference.length > 0 && complement.size === 0;
  };

  const bulkCheckboxIndeterminate = () => {
    return reference.length > 0 && complement.size > 0 && complement.size < reference.length;
  };

  const onBulkCheckboxChange = (e: CheckboxChangeEvent) => {
    const nextStatus = e.target.checked;
    if (nextStatus) {
      selectBulk(reference);
    } else {
      deselectBulk(reference);
    }
  };

  const checkBoxProps = (id: T) => {
    return {
      checked: isSelected(id),
      onChange: (e: CheckboxChangeEvent) => {
        const nextStatus = e.target.checked;
        if (nextStatus) {
          select(id);
        } else {
          deselect(id);
        }
      },
    };
  };

  return {
    selected,
    select,
    deselect,
    getSelection,
    isSelected,
    length: selected.size,
    clear,
    selectBulk,
    deselectBulk,
    setReference: handleSetReference,
    checkBoxProps,
    bulkCheckboxProps: {
      checked: bulkCheckboxChecked(),
      indeterminate: bulkCheckboxIndeterminate(),
      onChange: onBulkCheckboxChange,
    },
  };
};
