import Weekday from './weekday';
import dateutil from './dateutil';
import { Language } from './nlp/i18n';
import { GetText } from './nlp/totext';
import { Cache, ParsedOptions, Options, Frequency } from './types';
export declare const DEFAULT_OPTIONS: Options;
export declare const defaultKeys: ("bymonthday" | "freq" | "dtstart" | "interval" | "wkst" | "count" | "until" | "bysetpos" | "bymonth" | "bynmonthday" | "byyearday" | "byweekno" | "byweekday" | "bynweekday" | "byhour" | "byminute" | "bysecond" | "byeaster")[];
/**
 *
 * @param {Options?} options - see <http://labix.org/python-dateutil/#head-cf004ee9a75592797e076752b2a889c10f445418>
 *        The only required option is `freq`, one of RRule.YEARLY, RRule.MONTHLY, ...
 * @constructor
 */
export default class RRule {
    _string: any;
    _cache: Cache | null;
    origOptions: Partial<Options>;
    options: ParsedOptions;
    timeset: dateutil.Time[];
    _len: number;
    static readonly FREQUENCIES: (keyof typeof Frequency)[];
    static readonly YEARLY: Frequency;
    static readonly MONTHLY: Frequency;
    static readonly WEEKLY: Frequency;
    static readonly DAILY: Frequency;
    static readonly HOURLY: Frequency;
    static readonly MINUTELY: Frequency;
    static readonly SECONDLY: Frequency;
    static readonly MO: Weekday;
    static readonly TU: Weekday;
    static readonly WE: Weekday;
    static readonly TH: Weekday;
    static readonly FR: Weekday;
    static readonly SA: Weekday;
    static readonly SU: Weekday;
    constructor(options?: Partial<Options>, noCache?: boolean);
    static parseText(text: string, language: Language): Partial<Options>;
    static fromText(text: string, language?: Language): RRule;
    static parseString(rfcString: string): Partial<Options>;
    static fromString(str: string): RRule;
    static optionsToString(options: Partial<Options>): string;
    /**
     * @param {Function} iterator - optional function that will be called
     *                   on each date that is added. It can return false
     *                   to stop the iteration.
     * @return Array containing all recurrences.
     */
    all(iterator?: (d: Date, len: number) => boolean): Date[];
    /**
     * Returns all the occurrences of the rrule between after and before.
     * The inc keyword defines what happens if after and/or before are
     * themselves occurrences. With inc == True, they will be included in the
     * list, if they are found in the recurrence set.
     * @return Array
     */
    between(after: Date, before: Date, inc?: boolean, iterator?: (d: Date, len: number) => boolean): Date[];
    /**
     * Returns the last recurrence before the given datetime instance.
     * The inc keyword defines what happens if dt is an occurrence.
     * With inc == True, if dt itself is an occurrence, it will be returned.
     * @return Date or null
     */
    before(dt: Date, inc?: boolean): Date;
    /**
     * Returns the first recurrence after the given datetime instance.
     * The inc keyword defines what happens if dt is an occurrence.
     * With inc == True, if dt itself is an occurrence, it will be returned.
     * @return Date or null
     */
    after(dt: Date, inc?: boolean): Date;
    /**
     * Returns the number of recurrences in this set. It will have go trough
     * the whole recurrence, if this hasn't been done before.
     */
    count(): number;
    /**
     * Converts the rrule into its string representation
     * @see <http://www.ietf.org/rfc/rfc2445.txt>
     * @return String
     */
    toString(): string;
    /**
     * Will convert all rules described in nlp:ToText
     * to text.
     */
    toText(gettext?: GetText, language?: Language): string;
    isFullyConvertibleToText(): boolean;
    /**
     * @param {String} what - all/before/after/between
     * @param {Array,Date} value - an array of dates, one date, or null
     * @param {Object?} args - _iter arguments
     */
    private _cacheAdd;
    /**
     * @return false - not in the cache
     *         null  - cached, but zero occurrences (before/after)
     *         Date  - cached (before/after)
     *         []    - cached, but zero occurrences (all/between)
     *         [Date1, DateN] - cached (all/between)
     */
    private _cacheGet;
    /**
     * @return a RRule instance with the same freq and options
     *          as this one (cache is not cloned)
     */
    clone(): RRule;
    private _iter;
}
