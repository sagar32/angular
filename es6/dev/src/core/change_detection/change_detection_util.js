import { CONST_EXPR, isPresent, isBlank, looseIdentical, isPrimitive } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { StringMapWrapper, isListLikeIterable, areIterablesEqual } from 'angular2/src/facade/collection';
import { ChangeDetectionStrategy, isDefaultChangeDetectionStrategy } from './constants';
import { implementsOnDestroy } from './pipe_lifecycle_reflector';
import { BindingTarget } from './binding_record';
import { DirectiveIndex } from './directive_record';
/**
 * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 */
export class WrappedValue {
    constructor(wrapped) {
        this.wrapped = wrapped;
    }
    static wrap(value) {
        var w = _wrappedValues[_wrappedIndex++ % 5];
        w.wrapped = value;
        return w;
    }
}
var _wrappedValues = [
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null)
];
var _wrappedIndex = 0;
/**
 * Represents a basic change from a previous to a new value.
 */
export class SimpleChange {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    isFirstChange() { return this.previousValue === ChangeDetectionUtil.uninitialized; }
}
function _simpleChange(previousValue, currentValue) {
    return new SimpleChange(previousValue, currentValue);
}
/* tslint:disable:requireParameterType */
export class ChangeDetectionUtil {
    static arrayFn0() { return []; }
    static arrayFn1(a1) { return [a1]; }
    static arrayFn2(a1, a2) { return [a1, a2]; }
    static arrayFn3(a1, a2, a3) { return [a1, a2, a3]; }
    static arrayFn4(a1, a2, a3, a4) { return [a1, a2, a3, a4]; }
    static arrayFn5(a1, a2, a3, a4, a5) { return [a1, a2, a3, a4, a5]; }
    static arrayFn6(a1, a2, a3, a4, a5, a6) { return [a1, a2, a3, a4, a5, a6]; }
    static arrayFn7(a1, a2, a3, a4, a5, a6, a7) { return [a1, a2, a3, a4, a5, a6, a7]; }
    static arrayFn8(a1, a2, a3, a4, a5, a6, a7, a8) {
        return [a1, a2, a3, a4, a5, a6, a7, a8];
    }
    static arrayFn9(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return [a1, a2, a3, a4, a5, a6, a7, a8, a9];
    }
    static operation_negate(value) { return !value; }
    static operation_add(left, right) { return left + right; }
    static operation_subtract(left, right) { return left - right; }
    static operation_multiply(left, right) { return left * right; }
    static operation_divide(left, right) { return left / right; }
    static operation_remainder(left, right) { return left % right; }
    static operation_equals(left, right) { return left == right; }
    static operation_not_equals(left, right) { return left != right; }
    static operation_identical(left, right) { return left === right; }
    static operation_not_identical(left, right) { return left !== right; }
    static operation_less_then(left, right) { return left < right; }
    static operation_greater_then(left, right) { return left > right; }
    static operation_less_or_equals_then(left, right) { return left <= right; }
    static operation_greater_or_equals_then(left, right) { return left >= right; }
    static cond(cond, trueVal, falseVal) { return cond ? trueVal : falseVal; }
    static mapFn(keys) {
        function buildMap(values) {
            var res = StringMapWrapper.create();
            for (var i = 0; i < keys.length; ++i) {
                StringMapWrapper.set(res, keys[i], values[i]);
            }
            return res;
        }
        switch (keys.length) {
            case 0:
                return () => [];
            case 1:
                return (a1) => buildMap([a1]);
            case 2:
                return (a1, a2) => buildMap([a1, a2]);
            case 3:
                return (a1, a2, a3) => buildMap([a1, a2, a3]);
            case 4:
                return (a1, a2, a3, a4) => buildMap([a1, a2, a3, a4]);
            case 5:
                return (a1, a2, a3, a4, a5) => buildMap([a1, a2, a3, a4, a5]);
            case 6:
                return (a1, a2, a3, a4, a5, a6) => buildMap([a1, a2, a3, a4, a5, a6]);
            case 7:
                return (a1, a2, a3, a4, a5, a6, a7) => buildMap([a1, a2, a3, a4, a5, a6, a7]);
            case 8:
                return (a1, a2, a3, a4, a5, a6, a7, a8) => buildMap([a1, a2, a3, a4, a5, a6, a7, a8]);
            case 9:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9) => buildMap([a1, a2, a3, a4, a5, a6, a7, a8, a9]);
            default:
                throw new BaseException(`Does not support literal maps with more than 9 elements`);
        }
    }
    static keyedAccess(obj, args) { return obj[args[0]]; }
    static unwrapValue(value) {
        if (value instanceof WrappedValue) {
            return value.wrapped;
        }
        else {
            return value;
        }
    }
    static changeDetectionMode(strategy) {
        return isDefaultChangeDetectionStrategy(strategy) ? ChangeDetectionStrategy.CheckAlways :
            ChangeDetectionStrategy.CheckOnce;
    }
    static simpleChange(previousValue, currentValue) {
        return _simpleChange(previousValue, currentValue);
    }
    static isValueBlank(value) { return isBlank(value); }
    static s(value) { return isPresent(value) ? `${value}` : ''; }
    static protoByIndex(protos, selfIndex) {
        return selfIndex < 1 ?
            null :
            protos[selfIndex - 1]; // self index is shifted by one because of context
    }
    static callPipeOnDestroy(selectedPipe) {
        if (implementsOnDestroy(selectedPipe.pipe)) {
            selectedPipe.pipe.ngOnDestroy();
        }
    }
    static bindingTarget(mode, elementIndex, name, unit, debug) {
        return new BindingTarget(mode, elementIndex, name, unit, debug);
    }
    static directiveIndex(elementIndex, directiveIndex) {
        return new DirectiveIndex(elementIndex, directiveIndex);
    }
    static looseNotIdentical(a, b) { return !looseIdentical(a, b); }
    static devModeEqual(a, b) {
        if (isListLikeIterable(a) && isListLikeIterable(b)) {
            return areIterablesEqual(a, b, ChangeDetectionUtil.devModeEqual);
        }
        else if (!isListLikeIterable(a) && !isPrimitive(a) && !isListLikeIterable(b) &&
            !isPrimitive(b)) {
            return true;
        }
        else {
            return looseIdentical(a, b);
        }
    }
}
ChangeDetectionUtil.uninitialized = CONST_EXPR(new Object());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1ma3lmMlRtTC50bXAvYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFHUCxjQUFjLEVBQ2QsV0FBVyxFQUNaLE1BQU0sMEJBQTBCO09BQzFCLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDO09BQ3JELEVBR0wsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixpQkFBaUIsRUFDbEIsTUFBTSxnQ0FBZ0M7T0FFaEMsRUFBQyx1QkFBdUIsRUFBRSxnQ0FBZ0MsRUFBQyxNQUFNLGFBQWE7T0FDOUUsRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDRCQUE0QjtPQUN2RCxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQjtPQUN2QyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQjtBQUlqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSDtJQUNFLFlBQW1CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO0lBQUcsQ0FBQztJQUVuQyxPQUFPLElBQUksQ0FBQyxLQUFVO1FBQ3BCLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztBQUNILENBQUM7QUFFRCxJQUFJLGNBQWMsR0FBRztJQUNuQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDdEIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQ3RCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQztJQUN0QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDdEIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDO0NBQ3ZCLENBQUM7QUFFRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFFdEI7O0dBRUc7QUFDSDtJQUNFLFlBQW1CLGFBQWtCLEVBQVMsWUFBaUI7UUFBNUMsa0JBQWEsR0FBYixhQUFhLENBQUs7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBSztJQUFHLENBQUM7SUFFbkU7O09BRUc7SUFDSCxhQUFhLEtBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUMvRixDQUFDO0FBRUQsdUJBQXVCLGFBQWEsRUFBRSxZQUFZO0lBQ2hELE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVELHlDQUF5QztBQUN6QztJQUdFLE9BQU8sUUFBUSxLQUFZLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sUUFBUSxDQUFDLEVBQUUsSUFBVyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsT0FBTyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBVyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELE9BQU8sUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFXLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELE9BQU8sUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBVyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsT0FBTyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBVyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNFLE9BQU8sUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFXLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25GLE9BQU8sUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBVyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0YsT0FBTyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDNUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxPQUFPLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLElBQVMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0RCxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFTLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvRCxPQUFPLGtCQUFrQixDQUFDLElBQUksRUFBRSxLQUFLLElBQVMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBUyxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEUsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFTLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRSxPQUFPLG1CQUFtQixDQUFDLElBQUksRUFBRSxLQUFLLElBQVMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBUyxNQUFNLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkUsT0FBTyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFTLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RSxPQUFPLG1CQUFtQixDQUFDLElBQUksRUFBRSxLQUFLLElBQVMsTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLE9BQU8sdUJBQXVCLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBUyxNQUFNLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0UsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFTLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyRSxPQUFPLHNCQUFzQixDQUFDLElBQUksRUFBRSxLQUFLLElBQVMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLE9BQU8sNkJBQTZCLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBUyxNQUFNLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEYsT0FBTyxnQ0FBZ0MsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFTLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsSUFBUyxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRS9FLE9BQU8sS0FBSyxDQUFDLElBQVc7UUFDdEIsa0JBQWtCLE1BQU07WUFDdEIsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssQ0FBQztnQkFDSixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsS0FBSyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssQ0FBQztnQkFDSixNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEtBQUssQ0FBQztnQkFDSixNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsS0FBSyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELEtBQUssQ0FBQztnQkFDSixNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLEtBQUssQ0FBQztnQkFDSixNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEUsS0FBSyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLEtBQUssQ0FB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QixDQUFDLENBQU0sRUFBRSxDQUFNLElBQWEsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkYsT0FBTyxZQUFZLENBQUMsQ0FBTSxFQUFFLENBQU07UUFDaEMsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRW5FLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUNuRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUVkLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQS9IUSxpQ0FBYSxHQUFXLFVBQVUsQ0FBUyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBK0hoRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENPTlNUX0VYUFIsXG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgVHlwZSxcbiAgU3RyaW5nV3JhcHBlcixcbiAgbG9vc2VJZGVudGljYWwsXG4gIGlzUHJpbWl0aXZlXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1xuICBMaXN0V3JhcHBlcixcbiAgTWFwV3JhcHBlcixcbiAgU3RyaW5nTWFwV3JhcHBlcixcbiAgaXNMaXN0TGlrZUl0ZXJhYmxlLFxuICBhcmVJdGVyYWJsZXNFcXVhbFxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQcm90b1JlY29yZH0gZnJvbSAnLi9wcm90b19yZWNvcmQnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7aW1wbGVtZW50c09uRGVzdHJveX0gZnJvbSAnLi9waXBlX2xpZmVjeWNsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtCaW5kaW5nVGFyZ2V0fSBmcm9tICcuL2JpbmRpbmdfcmVjb3JkJztcbmltcG9ydCB7RGlyZWN0aXZlSW5kZXh9IGZyb20gJy4vZGlyZWN0aXZlX3JlY29yZCc7XG5pbXBvcnQge1NlbGVjdGVkUGlwZX0gZnJvbSAnLi9waXBlcyc7XG5cblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgcmVzdWx0IG9mIGEge0BsaW5rIFBpcGVNZXRhZGF0YX0gdHJhbnNmb3JtYXRpb24gaGFzIGNoYW5nZWQgZXZlbiB0aG91Z2ggdGhlXG4gKiByZWZlcmVuY2VcbiAqIGhhcyBub3QgY2hhbmdlZC5cbiAqXG4gKiBUaGUgd3JhcHBlZCB2YWx1ZSB3aWxsIGJlIHVud3JhcHBlZCBieSBjaGFuZ2UgZGV0ZWN0aW9uLCBhbmQgdGhlIHVud3JhcHBlZCB2YWx1ZSB3aWxsIGJlIHN0b3JlZC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XG4gKiAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcbiAqICB9IGVsc2Uge1xuICogICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICogICAgcmV0dXJuIFdyYXBwZWRWYWx1ZS53cmFwKHRoaXMuX2xhdGVzdFZhbHVlKTsgLy8gdGhpcyB3aWxsIGZvcmNlIHVwZGF0ZVxuICogIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgV3JhcHBlZFZhbHVlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHdyYXBwZWQ6IGFueSkge31cblxuICBzdGF0aWMgd3JhcCh2YWx1ZTogYW55KTogV3JhcHBlZFZhbHVlIHtcbiAgICB2YXIgdyA9IF93cmFwcGVkVmFsdWVzW193cmFwcGVkSW5kZXgrKyAlIDVdO1xuICAgIHcud3JhcHBlZCA9IHZhbHVlO1xuICAgIHJldHVybiB3O1xuICB9XG59XG5cbnZhciBfd3JhcHBlZFZhbHVlcyA9IFtcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKVxuXTtcblxudmFyIF93cmFwcGVkSW5kZXggPSAwO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBiYXNpYyBjaGFuZ2UgZnJvbSBhIHByZXZpb3VzIHRvIGEgbmV3IHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgU2ltcGxlQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByZXZpb3VzVmFsdWU6IGFueSwgcHVibGljIGN1cnJlbnRWYWx1ZTogYW55KSB7fVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBuZXcgdmFsdWUgaXMgdGhlIGZpcnN0IHZhbHVlIGFzc2lnbmVkLlxuICAgKi9cbiAgaXNGaXJzdENoYW5nZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucHJldmlvdXNWYWx1ZSA9PT0gQ2hhbmdlRGV0ZWN0aW9uVXRpbC51bmluaXRpYWxpemVkOyB9XG59XG5cbmZ1bmN0aW9uIF9zaW1wbGVDaGFuZ2UocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKTogU2ltcGxlQ2hhbmdlIHtcbiAgcmV0dXJuIG5ldyBTaW1wbGVDaGFuZ2UocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKTtcbn1cblxuLyogdHNsaW50OmRpc2FibGU6cmVxdWlyZVBhcmFtZXRlclR5cGUgKi9cbmV4cG9ydCBjbGFzcyBDaGFuZ2VEZXRlY3Rpb25VdGlsIHtcbiAgc3RhdGljIHVuaW5pdGlhbGl6ZWQ6IE9iamVjdCA9IENPTlNUX0VYUFI8T2JqZWN0PihuZXcgT2JqZWN0KCkpO1xuXG4gIHN0YXRpYyBhcnJheUZuMCgpOiBhbnlbXSB7IHJldHVybiBbXTsgfVxuICBzdGF0aWMgYXJyYXlGbjEoYTEpOiBhbnlbXSB7IHJldHVybiBbYTFdOyB9XG4gIHN0YXRpYyBhcnJheUZuMihhMSwgYTIpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyXTsgfVxuICBzdGF0aWMgYXJyYXlGbjMoYTEsIGEyLCBhMyk6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzXTsgfVxuICBzdGF0aWMgYXJyYXlGbjQoYTEsIGEyLCBhMywgYTQpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyLCBhMywgYTRdOyB9XG4gIHN0YXRpYyBhcnJheUZuNShhMSwgYTIsIGEzLCBhNCwgYTUpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyLCBhMywgYTQsIGE1XTsgfVxuICBzdGF0aWMgYXJyYXlGbjYoYTEsIGEyLCBhMywgYTQsIGE1LCBhNik6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2XTsgfVxuICBzdGF0aWMgYXJyYXlGbjcoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTddOyB9XG4gIHN0YXRpYyBhcnJheUZuOChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYThdO1xuICB9XG4gIHN0YXRpYyBhcnJheUZuOShhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KTogYW55W10ge1xuICAgIHJldHVybiBbYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOV07XG4gIH1cblxuICBzdGF0aWMgb3BlcmF0aW9uX25lZ2F0ZSh2YWx1ZSk6IGFueSB7IHJldHVybiAhdmFsdWU7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9hZGQobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCArIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fc3VidHJhY3QobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAtIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fbXVsdGlwbHkobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAqIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fZGl2aWRlKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgLyByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX3JlbWFpbmRlcihsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICUgcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9lcXVhbHMobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA9PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX25vdF9lcXVhbHMobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAhPSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2lkZW50aWNhbChsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ID09PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX25vdF9pZGVudGljYWwobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAhPT0gcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9sZXNzX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA8IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fZ3JlYXRlcl90aGVuKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgPiByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2xlc3Nfb3JfZXF1YWxzX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA8PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2dyZWF0ZXJfb3JfZXF1YWxzX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA+PSByaWdodDsgfVxuICBzdGF0aWMgY29uZChjb25kLCB0cnVlVmFsLCBmYWxzZVZhbCk6IGFueSB7IHJldHVybiBjb25kID8gdHJ1ZVZhbCA6IGZhbHNlVmFsOyB9XG5cbiAgc3RhdGljIG1hcEZuKGtleXM6IGFueVtdKTogYW55IHtcbiAgICBmdW5jdGlvbiBidWlsZE1hcCh2YWx1ZXMpOiB7W2s6IC8qYW55Ki8gc3RyaW5nXTogYW55fSB7XG4gICAgICB2YXIgcmVzID0gU3RyaW5nTWFwV3JhcHBlci5jcmVhdGUoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChyZXMsIGtleXNbaV0sIHZhbHVlc1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHN3aXRjaCAoa2V5cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuICgpID0+IFtdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gKGExKSA9PiBidWlsZE1hcChbYTFdKTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIpID0+IGJ1aWxkTWFwKFthMSwgYTJdKTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzKSA9PiBidWlsZE1hcChbYTEsIGEyLCBhM10pO1xuICAgICAgY2FzZSA0OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0KSA9PiBidWlsZE1hcChbYTEsIGEyLCBhMywgYTRdKTtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTVdKTtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSA9PiBidWlsZE1hcChbYTEsIGEyLCBhMywgYTQsIGE1LCBhNl0pO1xuICAgICAgY2FzZSA3OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSA9PiBidWlsZE1hcChbYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTddKTtcbiAgICAgIGNhc2UgODpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYThdKTtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSA9PlxuICAgICAgICAgICAgICAgICAgIGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5XSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgRG9lcyBub3Qgc3VwcG9ydCBsaXRlcmFsIG1hcHMgd2l0aCBtb3JlIHRoYW4gOSBlbGVtZW50c2ApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBrZXllZEFjY2VzcyhvYmosIGFyZ3MpOiBhbnkgeyByZXR1cm4gb2JqW2FyZ3NbMF1dOyB9XG5cbiAgc3RhdGljIHVud3JhcFZhbHVlKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFdyYXBwZWRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLndyYXBwZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2hhbmdlRGV0ZWN0aW9uTW9kZShzdHJhdGVneTogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kpOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIGlzRGVmYXVsdENoYW5nZURldGVjdGlvblN0cmF0ZWd5KHN0cmF0ZWd5KSA/IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrQWx3YXlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tPbmNlO1xuICB9XG5cbiAgc3RhdGljIHNpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlOiBhbnksIGN1cnJlbnRWYWx1ZTogYW55KTogU2ltcGxlQ2hhbmdlIHtcbiAgICByZXR1cm4gX3NpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpO1xuICB9XG5cbiAgc3RhdGljIGlzVmFsdWVCbGFuayh2YWx1ZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBpc0JsYW5rKHZhbHVlKTsgfVxuXG4gIHN0YXRpYyBzKHZhbHVlOiBhbnkpOiBzdHJpbmcgeyByZXR1cm4gaXNQcmVzZW50KHZhbHVlKSA/IGAke3ZhbHVlfWAgOiAnJzsgfVxuXG4gIHN0YXRpYyBwcm90b0J5SW5kZXgocHJvdG9zOiBQcm90b1JlY29yZFtdLCBzZWxmSW5kZXg6IG51bWJlcik6IFByb3RvUmVjb3JkIHtcbiAgICByZXR1cm4gc2VsZkluZGV4IDwgMSA/XG4gICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgIHByb3Rvc1tzZWxmSW5kZXggLSAxXTsgIC8vIHNlbGYgaW5kZXggaXMgc2hpZnRlZCBieSBvbmUgYmVjYXVzZSBvZiBjb250ZXh0XG4gIH1cblxuICBzdGF0aWMgY2FsbFBpcGVPbkRlc3Ryb3koc2VsZWN0ZWRQaXBlOiBTZWxlY3RlZFBpcGUpOiB2b2lkIHtcbiAgICBpZiAoaW1wbGVtZW50c09uRGVzdHJveShzZWxlY3RlZFBpcGUucGlwZSkpIHtcbiAgICAgICg8YW55PnNlbGVjdGVkUGlwZS5waXBlKS5uZ09uRGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBiaW5kaW5nVGFyZ2V0KG1vZGU6IHN0cmluZywgZWxlbWVudEluZGV4OiBudW1iZXIsIG5hbWU6IHN0cmluZywgdW5pdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zzogc3RyaW5nKTogQmluZGluZ1RhcmdldCB7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nVGFyZ2V0KG1vZGUsIGVsZW1lbnRJbmRleCwgbmFtZSwgdW5pdCwgZGVidWcpO1xuICB9XG5cbiAgc3RhdGljIGRpcmVjdGl2ZUluZGV4KGVsZW1lbnRJbmRleDogbnVtYmVyLCBkaXJlY3RpdmVJbmRleDogbnVtYmVyKTogRGlyZWN0aXZlSW5kZXgge1xuICAgIHJldHVybiBuZXcgRGlyZWN0aXZlSW5kZXgoZWxlbWVudEluZGV4LCBkaXJlY3RpdmVJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgbG9vc2VOb3RJZGVudGljYWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuICFsb29zZUlkZW50aWNhbChhLCBiKTsgfVxuXG4gIHN0YXRpYyBkZXZNb2RlRXF1YWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoaXNMaXN0TGlrZUl0ZXJhYmxlKGEpICYmIGlzTGlzdExpa2VJdGVyYWJsZShiKSkge1xuICAgICAgcmV0dXJuIGFyZUl0ZXJhYmxlc0VxdWFsKGEsIGIsIENoYW5nZURldGVjdGlvblV0aWwuZGV2TW9kZUVxdWFsKTtcblxuICAgIH0gZWxzZSBpZiAoIWlzTGlzdExpa2VJdGVyYWJsZShhKSAmJiAhaXNQcmltaXRpdmUoYSkgJiYgIWlzTGlzdExpa2VJdGVyYWJsZShiKSAmJlxuICAgICAgICAgICAgICAgIWlzUHJpbWl0aXZlKGIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbG9vc2VJZGVudGljYWwoYSwgYik7XG4gICAgfVxuICB9XG59XG4iXX0=