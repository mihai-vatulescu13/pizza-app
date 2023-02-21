import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  state(
    'void',
    style({
      opacity: 0,
    })
  ),
  transition('void <=> *', animate(200)),
]);
