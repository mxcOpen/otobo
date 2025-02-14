// --
// OTOBO is a web-based ticketing system for service organisations.
// --
// Copyright (C) 2001-2020 OTRS AG, https://otrs.com/
// Copyright (C) 2019-2022 Rother OSS GmbH, https://otobo.de/
// --
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
// --

"use strict";

var Core = Core || {};

/**
 * @namespace Core.Data
 * @memberof Core
 * @author
 * @description
 *      Provides functions for setting and getting data (objects) to and from DOM elements.
 */
Core.Data = (function (TargetNS) {

    /**
     * @name Set
     * @memberof Core.Data
     * @function
     * @param {jQueryObject} $Element - jquery object.
     * @param {String} Name - The name of the object, which can be referenced to get the data again (-> the variable name).
     * @param {Object} Object - The javascript data you want to save (any type of javascript object).
     * @description
     *      Save object data to an element.
     */
    TargetNS.Set = function ($Element, Name, Object) {
        if (isJQueryObject($Element)) {
            $Element.data(Name, Object);
        }
    };

    /**
     * @name Get
     * @memberof Core.Data
     * @function
     * @returns {Object} The stored data or an empty object on failure.
     * @param {jQueryObject} $Element - jquery object.
     * @param {String} Name - The name of the object, which can be referenced to get the data again (-> the variable name).
     * @description
     *      Retrieve data from dom element.
     */
    TargetNS.Get = function ($Element, Name) {
        var DataObject;
        if (isJQueryObject($Element)) {
            DataObject = $Element.data(Name);
            if (typeof DataObject === 'undefined' || DataObject === null) {
                return {};
            }
            else {
                return DataObject;
            }
        }
        return {};
    };

    /**
     * @name CompareObject
     * @memberof Core.Data
     * @function
     * @returns {Boolean} True if objects are equal, false otherwise.
     * @param {Object} ObjectOne - The object which should be compared
     * @param {Object} ObjectTwo - The object which should be compared
     * @description
     *      This function compares 2 JS Objects (based on their keys and values).
     */
    TargetNS.CompareObject = function (ObjectOne, ObjectTwo) {
        var Key;

        if (!ObjectOne || !ObjectTwo) {
            return false;
        }
        if (typeof ObjectOne !== 'object' || typeof ObjectTwo !== 'object') {
            return false;
        }

        if (ObjectOne.constructor !== ObjectTwo.constructor) {
            return false;
        }

        for (Key in ObjectOne) {
            if ((typeof ObjectOne[Key] === 'object') &&
                (typeof ObjectTwo[Key] === 'object')) {
                if (!Core.Data.CompareObject(ObjectOne[Key], ObjectTwo[Key])) {
                    return false;
                }
            }
            else {
                if (ObjectOne[Key] !== ObjectTwo[Key]) {
                    return false;
                }
            }
        }

        for (Key in ObjectTwo) {
            if ((typeof ObjectTwo[Key] === 'object') &&
                (typeof ObjectOne[Key] === 'object')) {
                if (!Core.Data.CompareObject(ObjectTwo[Key], ObjectOne[Key])) {
                    return false;
                }
            }
            else {
                if (ObjectTwo[Key] !== ObjectOne[Key]) {
                    return false;
                }
            }
        }

        return true;
    };

    /**
     * @name CopyObject
     * @memberof Core.Data
     * @function
     * @returns {Object} The copied object.
     * @param {Object}  Data - The object which should be copied
     * @description
     *      This function creates a real copy of an object.
     */
    TargetNS.CopyObject = function (Data) {
        var Key = '',
            TempObject;
        if (!Data || typeof Data !== 'object') {
            return Data;
        }

        TempObject = new Data.constructor();
        for (Key in Data) {
            if (Data.hasOwnProperty(Key)) {
                TempObject[Key] = Core.Data.CopyObject(Data[Key]);
            }
        }
        return TempObject;
    };

    return TargetNS;
}(Core.Data || {}));
