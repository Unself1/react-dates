import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import { DayPickerNavigationPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';
import ChevronUp from '../svg/chevron-up.svg';
import ChevronDown from '../svg/chevron-down.svg';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../constants';

const propTypes = forbidExtraProps({
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  orientation: ScrollableOrientationShape,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  onPrevYearClick: PropTypes.func,
  onNextYearClick: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerNavigationPhrases)),

  isRTL: PropTypes.bool,
  isYearsEnabled: PropTypes.bool,
});

const defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevMonthClick() {},
  onNextMonthClick() {},

  onPrevYearClick() {},
  onNextYearClick() {},

  // internationalization
  phrases: DayPickerNavigationPhrases,
  isRTL: false,
  isYearsEnabled: false,
};

export default function DayPickerNavigation(props) {
  const {
    navPrev,
    navNext,
    onPrevMonthClick,
    onNextMonthClick,
    onPrevYearClick,
    onNextYearClick,
    orientation,
    phrases,
    isRTL,
    isYearsEnabled,
  } = props;

  const isVertical = orientation !== HORIZONTAL_ORIENTATION;
  const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;

  let navPrevIcon = navPrev;
  let navNextIcon = navNext;
  let isDefaultNavPrev = false;
  let isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    navPrevIcon = isVertical ? <ChevronUp /> : <LeftArrow />;
    if (isRTL && !isVertical) {
      navPrevIcon = <RightArrow />;
    }
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
    if (isRTL && !isVertical) {
      navNextIcon = <LeftArrow />;
    }
  }

  const navClassNames = cx('DayPickerNavigation', {
    'DayPickerNavigation--horizontal': !isVertical,
    'DayPickerNavigation--vertical': isVertical,
    'DayPickerNavigation--vertical-scrollable': isVerticalScrollable,
  });
  const prevMonthClassNames = cx('DayPickerNavigationMonth__prev', {
    'DayPickerNavigationMonth__prev--default': isDefaultNavPrev,
    'DayPickerNavigationMonth__prev--rtl': isRTL,
  });
  const nextMonthClassNames = cx('DayPickerNavigationMonth__next', {
    'DayPickerNavigationMonth__next--default': isDefaultNavNext,
    'DayPickerNavigationMonth__next--rtl': isRTL,
  });
  const prevYearClassNames = cx('DayPickerNavigationYear__prev', {
    'DayPickerNavigationYear__prev--default': isDefaultNavPrev,
    'DayPickerNavigationYear__prev--rtl': isRTL,
  });
  const nextYearClassNames = cx('DayPickerNavigationYear__next', {
    'DayPickerNavigationYear__next--default': isDefaultNavNext,
    'DayPickerNavigationYear__next--rtl': isRTL,
  });

  return (
    <div className={navClassNames}>
      <div className="DayPickerNavigationMonth">
        {!isVerticalScrollable && (
          <button
            type="button"
            aria-label={phrases.jumpToPrevMonth}
            className={prevMonthClassNames}
            onClick={onPrevMonthClick}
            onMouseUp={(e) => {
              e.currentTarget.blur();
            }}
          >
            {navPrevIcon}
          </button>
        )}

        <button
          type="button"
          aria-label={phrases.jumpToNextMonth}
          className={nextMonthClassNames}
          onClick={onNextMonthClick}
          onMouseUp={(e) => {
            e.currentTarget.blur();
          }}
        >
          {navNextIcon}
        </button>
      </div>
      {isYearsEnabled && (
        <div className="DayPickerNavigationYear">
          <button
            type="button"
            aria-label={phrases.jumpToPrevMonth}
            className={prevYearClassNames}
            onClick={onPrevYearClick}
            onMouseUp={(e) => {
              e.currentTarget.blur();
            }}
          >
            {navPrevIcon}
          </button>
          <button
            type="button"
            aria-label={phrases.jumpToNextMonth}
            className={nextYearClassNames}
            onClick={onNextYearClick}
            onMouseUp={(e) => {
              e.currentTarget.blur();
            }}
          >
            {navNextIcon}
          </button>
        </div>
      )}
    </div>
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;
