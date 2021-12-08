import { cartConstants } from '../helpers/constants';

const INITIAL_STATE = { book_id: '', bookes: [], coupon: {} };

export default function cart(state = INITIAL_STATE, action) {
    switch (action.type) {

        case cartConstants.ITEM_INCREMENT: {
            let books: any = state.book_id ?? [];
            const index = books.findIndex((book: any) => book.id === action.payload.book_id);

            if (state.book_id !== action.payload.book_id)
                books = []

            if (index === -1 || (action.payload.addons && action.payload.addons.length > 0)) {
                books.push({
                    count: 1,
                    addons_book: action.payload.addons ?? [],
                    price: action.payload.amount,
                    name: action.payload.name,
                    id: action.payload.dish_id
                });
            } else
                books[index].count++;

            return {
                ...state,
                book_id: action.payload.book_id,
                books
            };
        }

        case cartConstants.ITEM_DECREMENT: {
            let books: any = state.book_id;
            const index = books.findIndex((book: any) => book.id === action.payload.book_id);

            if (index !== -1) {
                if (books[index].count === 1)
                    books.splice(index, 1);
                else
                    books[index].count--;
            }
            return {
                ...state,
                book_id: action.payload.book_id,
                books
            };
        }

        case cartConstants.ADDONS_SHOW: {
            return {
                ...state,
                addons: action.payload
            };
        }

        case cartConstants.ADDONS_HIDE: {
            return {
                ...state,
                addons: []
            };
        }

        case cartConstants.COUPON_ADD: {
            return {
                ...state,
                coupon: action.payload
            };
        }

        case cartConstants.COUPON_REMOVE: {
            return {
                ...state,
                coupon: {}
            };
        }

        case cartConstants.GRAND_TOTAL: {
            return {
                ...state,
                total: action.payload
            };
        }

        case cartConstants.ORDER_SUCCESS: {
            return { book_id: '', books: [], coupon: {} };
        }
        default:
            return state
    }
}
