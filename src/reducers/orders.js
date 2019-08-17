import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_ORDER:
      return [
        ...state,
        {...action.payload, ingredients:[], position:'clients'}
      ]
    case MOVE_ORDER_NEXT:
      return state.map((item) => 
        item.id === action.payload ? moveNext(item) : item
      )
    case MOVE_ORDER_BACK:
      return state.map(item => 
        item.id === action.payload ? moveBack(item) : item
      )
    case ADD_INGREDIENT:
      return state.map(item =>
        item.position === action.payload.from
        ? {...item, ingredients: [...item.ingredients, action.payload.ingredient]}
        : item
      )
    default:
      return state;
  }
};

const moveNext = item => {
  switch (item.position) {
    case 'clients':
      return {...item, position:'conveyor_1'}
    case 'conveyor_1':
      return {...item, position:'conveyor_2'}
    case 'conveyor_2':
      return {...item, position:'conveyor_3'}
    case 'conveyor_3':
      return {...item, position:'conveyor_4'}
    case 'conveyor_4':
      return {...item, position:'finish'}
    default:
      return item.position
  }
}

const moveBack = item => {
  switch (item.position) {
    case 'conveyor_1':
    case 'conveyor_2':
      return {...item, position:'conveyor_1'}
    case 'conveyor_3':
      return {...item, position:'conveyor_2'}
    case 'conveyor_4':
      return {...item, position:'conveyor_3'}
    default:
      return item.position
  }
}

export const getOrdersFor = (state, position) =>
  state.orders.filter(order => order.position === position);
