import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// ⚠️  https://github.com/reduxjs/redux-thunk/issues/333#issuecomment-1286695992
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
