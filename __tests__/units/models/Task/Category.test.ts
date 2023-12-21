import { describe, expect, test } from "@jest/globals";
import TaskCategory from "../../../../app/models/Task/Category";
import Theme from "../../../../config/Theme";
import { taskCategories } from "../../../../app/storage/data/tasks/categories";

describe('Task Category Model', () => {

  test('it should be the good Category finded by category title: santé', () => {
    const category = TaskCategory.findBy('santé');
    expect(category).toStrictEqual({
      id: 3,
      title: 'santé',
      color: null
    })
  });

  test('it should be the good Category finded by category title: tâche', () => {
    const category = TaskCategory.findBy('tâche');
    expect(category).toStrictEqual({
      id: 1,
      title: 'tâche',
      color: Theme.primary
    })
  });

  test('it should be the good Category finded by ID', () => {
    const category = TaskCategory.findById(1);
    expect(category).toStrictEqual({
      id: 1,
      title: 'tâche',
      color: Theme.primary
    })
  });

  test("it should be null if category isn't finded by id", () => {
    const category = TaskCategory.findById(7899);
    expect(category).toBeNull();
  });

  test("it should be null if category isn't finded by title", () => {
    const category = TaskCategory.findBy('qsqdhqdsdkhshdf');
    expect(category).toBeNull();
  });

  test('get all categories', () => {
    const categories = TaskCategory.getCategories();
    expect(categories).toStrictEqual(taskCategories);
  });
}); 