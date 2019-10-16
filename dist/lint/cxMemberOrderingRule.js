"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = __importStar(require("tslint"));
const tsutils_1 = require("tsutils");
const ts = __importStar(require("typescript"));
const error_1 = require("./helpers/error");
const utils_1 = require("./helpers/utils");
/* tslint:disable */
/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const OPTION_ORDER = 'order';
const OPTION_ALPHABETIZE = 'alphabetize';
var MemberKind;
(function (MemberKind) {
    MemberKind[MemberKind["publicDecoratedField"] = 0] = "publicDecoratedField";
    MemberKind[MemberKind["publicDecoratedGetter"] = 1] = "publicDecoratedGetter";
    MemberKind[MemberKind["publicDecoratedMethod"] = 2] = "publicDecoratedMethod";
    MemberKind[MemberKind["publicDecoratedSetter"] = 3] = "publicDecoratedSetter";
    MemberKind[MemberKind["protectedDecoratedField"] = 4] = "protectedDecoratedField";
    MemberKind[MemberKind["protectedDecoratedGetter"] = 5] = "protectedDecoratedGetter";
    MemberKind[MemberKind["protectedDecoratedMethod"] = 6] = "protectedDecoratedMethod";
    MemberKind[MemberKind["protectedDecoratedSetter"] = 7] = "protectedDecoratedSetter";
    MemberKind[MemberKind["privateDecoratedField"] = 8] = "privateDecoratedField";
    MemberKind[MemberKind["privateDecoratedGetter"] = 9] = "privateDecoratedGetter";
    MemberKind[MemberKind["privateDecoratedMethod"] = 10] = "privateDecoratedMethod";
    MemberKind[MemberKind["privateDecoratedSetter"] = 11] = "privateDecoratedSetter";
    MemberKind[MemberKind["publicAbstractField"] = 12] = "publicAbstractField";
    MemberKind[MemberKind["publicAbstractGetter"] = 13] = "publicAbstractGetter";
    MemberKind[MemberKind["publicAbstractMethod"] = 14] = "publicAbstractMethod";
    MemberKind[MemberKind["publicAbstractSetter"] = 15] = "publicAbstractSetter";
    MemberKind[MemberKind["protectedAbstractField"] = 16] = "protectedAbstractField";
    MemberKind[MemberKind["protectedAbstractGetter"] = 17] = "protectedAbstractGetter";
    MemberKind[MemberKind["protectedAbstractMethod"] = 18] = "protectedAbstractMethod";
    MemberKind[MemberKind["protectedAbstractSetter"] = 19] = "protectedAbstractSetter";
    MemberKind[MemberKind["privateAbstractField"] = 20] = "privateAbstractField";
    MemberKind[MemberKind["privateAbstractGetter"] = 21] = "privateAbstractGetter";
    MemberKind[MemberKind["privateAbstractMethod"] = 22] = "privateAbstractMethod";
    MemberKind[MemberKind["privateAbstractSetter"] = 23] = "privateAbstractSetter";
    MemberKind[MemberKind["publicReadonlyField"] = 24] = "publicReadonlyField";
    MemberKind[MemberKind["protectedReadonlyField"] = 25] = "protectedReadonlyField";
    MemberKind[MemberKind["privateReadonlyField"] = 26] = "privateReadonlyField";
    MemberKind[MemberKind["publicStaticField"] = 27] = "publicStaticField";
    MemberKind[MemberKind["publicStaticGetter"] = 28] = "publicStaticGetter";
    MemberKind[MemberKind["publicStaticMethod"] = 29] = "publicStaticMethod";
    MemberKind[MemberKind["publicStaticSetter"] = 30] = "publicStaticSetter";
    MemberKind[MemberKind["protectedStaticField"] = 31] = "protectedStaticField";
    MemberKind[MemberKind["protectedStaticGetter"] = 32] = "protectedStaticGetter";
    MemberKind[MemberKind["protectedStaticMethod"] = 33] = "protectedStaticMethod";
    MemberKind[MemberKind["protectedStaticSetter"] = 34] = "protectedStaticSetter";
    MemberKind[MemberKind["privateStaticField"] = 35] = "privateStaticField";
    MemberKind[MemberKind["privateStaticGetter"] = 36] = "privateStaticGetter";
    MemberKind[MemberKind["privateStaticMethod"] = 37] = "privateStaticMethod";
    MemberKind[MemberKind["privateStaticSetter"] = 38] = "privateStaticSetter";
    MemberKind[MemberKind["publicInstanceField"] = 39] = "publicInstanceField";
    MemberKind[MemberKind["publicInstanceGetter"] = 40] = "publicInstanceGetter";
    MemberKind[MemberKind["publicInstanceSetter"] = 41] = "publicInstanceSetter";
    MemberKind[MemberKind["protectedInstanceField"] = 42] = "protectedInstanceField";
    MemberKind[MemberKind["protectedInstanceGetter"] = 43] = "protectedInstanceGetter";
    MemberKind[MemberKind["protectedInstanceSetter"] = 44] = "protectedInstanceSetter";
    MemberKind[MemberKind["privateInstanceField"] = 45] = "privateInstanceField";
    MemberKind[MemberKind["privateInstanceGetter"] = 46] = "privateInstanceGetter";
    MemberKind[MemberKind["privateInstanceSetter"] = 47] = "privateInstanceSetter";
    MemberKind[MemberKind["publicConstructor"] = 48] = "publicConstructor";
    MemberKind[MemberKind["protectedConstructor"] = 49] = "protectedConstructor";
    MemberKind[MemberKind["privateConstructor"] = 50] = "privateConstructor";
    MemberKind[MemberKind["ngInstanceMethod"] = 51] = "ngInstanceMethod";
    MemberKind[MemberKind["publicInstanceMethod"] = 52] = "publicInstanceMethod";
    MemberKind[MemberKind["protectedInstanceMethod"] = 53] = "protectedInstanceMethod";
    MemberKind[MemberKind["privateInstanceMethod"] = 54] = "privateInstanceMethod";
})(MemberKind || (MemberKind = {}));
const PRESETS = new Map([
    [
        'fields-first', [
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'constructor',
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method'
        ]
    ],
    [
        'instance-sandwich', [
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
            'public-static-method',
            'protected-static-method',
            'private-static-method'
        ]
    ],
    [
        'statics-first', [
            'public-static-field',
            'public-static-method',
            'protected-static-field',
            'protected-static-method',
            'private-static-field',
            'private-static-method',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method'
        ]
    ]
]);
const PRESET_NAMES = Array.from(PRESETS.keys());
const allMemberKindNames = utils_1.mapDefined(Object.keys(MemberKind), (key) => {
    const mk = MemberKind[key];
    return typeof mk === 'number' ? MemberKind[mk].replace(/[A-Z]/g, (cap) => `-${cap.toLowerCase()}`) : undefined;
});
const namesMarkdown = (names) => {
    return names.map((name) => {
        return `* \`${name}\``;
    }).join('\n    ');
};
const optionsDescription = Lint.Utils.dedent `
    One argument, which is an object, must be provided. It should contain an \`order\` property.
    The \`order\` property should have a value of one of the following strings:

    ${namesMarkdown(PRESET_NAMES)}

    Alternatively, the value for \`order\` may be an array consisting of the following strings:

    ${namesMarkdown(allMemberKindNames)}

    You can also omit the access modifier to refer to 'public-', 'protected-',
    and 'private-' all at once; for example, 'static-field'.

    You can also make your own categories by using an object instead of a string:

        {
            'name': 'static non-private',
            'kinds': [
                'public-static-field',
                'protected-static-field',
                'public-static-method',
                'protected-static-method'
            ]
        }

    The '${OPTION_ALPHABETIZE}' option will enforce that members within the same
    category should be alphabetically sorted by name.`;
class Rule extends Lint.Rules.AbstractRule {
    static FAILURE_STRING_ALPHABETIZE(prevName, curName) {
        const show = (s) => {
            return s === '' ? 'Computed property' : `'${s}'`;
        };
        return `${show(curName)} should come alphabetically before ${show(prevName)}`;
    }
    apply(sourceFile) {
        let options;
        try {
            options = parseOptions(this.ruleArguments);
        }
        catch (e) {
            error_1.showWarningOnce(`Warning: ${this.ruleName} - ${e.stack}`);
            return [];
        }
        return this.applyWithWalker(new MemberOrderingWalker(sourceFile, this.ruleName, options));
    }
}
Rule.metadata = {
    ruleName: 'member-ordering',
    description: 'Enforces member ordering.',
    hasFix: true,
    rationale: Lint.Utils.dedent `
            A consistent ordering for class members can make classes easier to read, navigate, and edit.

            A common opposite practice to \`member-ordering\` is to keep related groups of classes together.
            Instead of creating classes with multiple separate groups, consider splitting class responsibilities
            apart across multiple single-responsibility classes.
        `,
    optionsDescription,
    options: {
        type: 'object',
        properties: {
            order: {
                oneOf: [
                    {
                        type: 'string',
                        enum: PRESET_NAMES
                    },
                    {
                        type: 'array',
                        items: {
                            type: 'string',
                            enum: allMemberKindNames
                        },
                        maxLength: 13
                    }
                ]
            }
        },
        additionalProperties: false
    },
    optionExamples: [
        [true, { order: 'fields-first' }],
        [true, {
                order: [
                    'public-static-field',
                    'public-instance-field',
                    'public-constructor',
                    'private-static-field',
                    'private-instance-field',
                    'private-constructor',
                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method'
                ]
            }],
        [true, {
                order: [
                    {
                        name: 'static non-private',
                        kinds: [
                            'public-static-field',
                            'protected-static-field',
                            'public-static-method',
                            'protected-static-method'
                        ]
                    },
                    'constructor'
                ]
            }]
    ],
    type: 'typescript',
    typescriptOnly: false
};
exports.Rule = Rule;
class MemberOrderingWalker extends Lint.AbstractWalker {
    constructor() {
        super(...arguments);
        this.fixes = [];
    }
    walk(sourceFile) {
        const cb = (node) => {
            // NB: iterate through children first!
            ts.forEachChild(node, cb);
            switch (node.kind) {
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.ClassExpression:
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.TypeLiteral:
                    this.checkMembers(node.members);
            }
        };
        ts.forEachChild(sourceFile, cb);
        // assign Replacements which have not been merged into surrounding ones to their RuleFailures.
        this.fixes.forEach(([failure, replacement]) => {
            failure.getFix().push(replacement);
        });
    }
    /**
     * Check wether the passed members adhere to the configured order. If not, RuleFailures are generated and a single
     * Lint.Replacement is generated, which replaces the entire NodeArray with a correctly sorted one. The Replacement
     * is not immediately added to a RuleFailure, as incorrectly sorted nodes can be nested (e.g. a class declaration
     * in a method implementation), but instead temporarily stored in `this.fixes`. Nested Replacements are manually
     * merged, as TSLint doesn't handle overlapping ones. For this reason it is important that the recursion happens
     * before the checkMembers call in this.walk().
     */
    checkMembers(members) {
        let prevRank = -1;
        let prevName;
        let failureExists = false;
        for (const member of members) {
            const rank = this.memberRank(member);
            if (rank === -1) {
                // no explicit ordering for this kind of node specified, so continue
                continue;
            }
            if (rank < prevRank) {
                const nodeType = this.rankName(rank);
                const prevNodeType = this.rankName(prevRank);
                const lowerRank = this.findLowerRank(members, rank);
                const locationHint = lowerRank !== -1
                    ? `after ${this.rankName(lowerRank)}s`
                    : 'at the beginning of the class/interface';
                const errorLine1 = `Declaration of ${nodeType} not allowed after declaration of ${prevNodeType}. `
                    + `Instead, this should come ${locationHint}.`;
                // add empty array as fix so we can add a replacement later. (fix itself is readonly)
                this.addFailureAtNode(member, errorLine1, []);
                failureExists = true;
            }
            else {
                if (this.options.alphabetize && member.name !== undefined) {
                    if (rank !== prevRank) {
                        // No alphabetical ordering between different ranks
                        prevName = undefined;
                    }
                    const curName = decoratedNameString(member);
                    if (prevName !== undefined && caseInsensitiveLess(curName, prevName)) {
                        this.addFailureAtNode(member.name, Rule.FAILURE_STRING_ALPHABETIZE(this.findLowerName(members, rank, curName), curName), []);
                        failureExists = true;
                    }
                    else {
                        prevName = curName;
                    }
                }
                // keep track of last good node
                prevRank = rank;
            }
        }
        if (failureExists) {
            const sortedMemberIndexes = members.map((_, i) => {
                return i;
            }).sort((ai, bi) => {
                const a = members[ai];
                const b = members[bi];
                // first, sort by member rank
                const rankDiff = this.memberRank(a) - this.memberRank(b);
                if (rankDiff !== 0) {
                    return rankDiff;
                }
                // then lexicographically if alphabetize == true
                if (this.options.alphabetize && a.name !== undefined && b.name !== undefined) {
                    const aName = decoratedNameString(a);
                    const bName = decoratedNameString(b);
                    const nameDiff = aName.localeCompare(bName);
                    if (nameDiff !== 0) {
                        return nameDiff;
                    }
                }
                // finally, sort by position in original NodeArray so the sort remains stable.
                return ai - bi;
            });
            const splits = getSplitIndexes(members, this.sourceFile.text);
            const sortedMembersText = sortedMemberIndexes.map((i) => {
                const start = splits[i];
                const end = splits[i + 1];
                let nodeText = this.sourceFile.text.substring(start, end);
                while (true) {
                    // check if there are previous fixes which we need to merge into this one
                    // if yes, remove it from the list so that we do not return overlapping Replacements
                    const fixIndex = arrayFindLastIndex(this.fixes, ([, r]) => {
                        return r.start >= start && r.start + r.length <= end;
                    });
                    if (fixIndex === -1) {
                        break;
                    }
                    const fix = this.fixes.splice(fixIndex, 1)[0];
                    const [, replacement] = fix;
                    nodeText = applyReplacementOffset(nodeText, replacement, start);
                }
                return nodeText;
            });
            // instead of assigning the fix immediately to the last failure, we temporarily store it in `this.fixes`,
            // in case a containing node needs to be fixed too. We only 'add' the fix to the last failure, although
            // it fixes all failures in this NodeArray, as TSLint doesn't handle duplicate Replacements.
            this.fixes.push([
                arrayLast(this.failures),
                Lint.Replacement.replaceFromTo(splits[0], arrayLast(splits), sortedMembersText.join(''))
            ]);
        }
    }
    /** Finds the lowest name higher than 'targetName'. */
    findLowerName(members, targetRank, targetName) {
        for (const member of members) {
            if (member.name === undefined || this.memberRank(member) !== targetRank) {
                continue;
            }
            const name = decoratedNameString(member);
            if (caseInsensitiveLess(targetName, name)) {
                return name;
            }
        }
        throw new Error('Expected to find a name');
    }
    /** Finds the highest existing rank lower than `targetRank`. */
    findLowerRank(members, targetRank) {
        let max = -1;
        for (const member of members) {
            const rank = this.memberRank(member);
            if (rank !== -1 && rank < targetRank) {
                max = Math.max(max, rank);
            }
        }
        return max;
    }
    memberRank(member) {
        const optionName = getMemberKind(member);
        if (optionName === undefined) {
            return -1;
        }
        return this.options.order.findIndex((category) => {
            return category.has(optionName);
        });
    }
    rankName(rank) {
        return this.options.order[rank].name;
    }
}
const caseInsensitiveLess = (a, b) => {
    return a.toLowerCase() < b.toLowerCase();
};
const memberKindForConstructor = (access) => {
    return MemberKind[`${access}Constructor`];
};
const memberKindForMethodOrField = (access, membership, kind) => {
    return MemberKind[access + membership + kind];
};
const allAccess = ['public', 'protected', 'private'];
const getMembership = (member) => {
    if (member.decorators && member.decorators.length) {
        return 'Decorated';
    }
    if (tsutils_1.hasModifier(member.modifiers, ts.SyntaxKind.AbstractKeyword)) {
        return 'Abstract';
    }
    if (tsutils_1.hasModifier(member.modifiers, ts.SyntaxKind.StaticKeyword)) {
        return 'Static';
    }
    if (tsutils_1.hasModifier(member.modifiers, ts.SyntaxKind.ReadonlyKeyword)) {
        return 'Readonly';
    }
    return 'Instance';
};
const memberKindFromName = (name) => {
    const kind = MemberKind[Lint.Utils.camelize(name)];
    const addModifier = (modifier) => {
        const modifiedKind = MemberKind[Lint.Utils.camelize(`${modifier}-${name}`)];
        if (typeof modifiedKind !== 'number') {
            throw new Error(`Bad member kind: ${name}`);
        }
        return modifiedKind;
    };
    return typeof kind === 'number' ? [kind] : allAccess.map(addModifier);
};
const getMemberKind = (member) => {
    const accessLevel = tsutils_1.hasModifier(member.modifiers, ts.SyntaxKind.PrivateKeyword) ? 'private'
        : tsutils_1.hasModifier(member.modifiers, ts.SyntaxKind.ProtectedKeyword) ? 'protected'
            : 'public';
    const accessor = (type) => {
        const membership = getMembership(member);
        return memberKindForMethodOrField(accessLevel, membership, type);
    };
    const methodOrField = (isMethod) => {
        if (isMethod && testForNg()) {
            return MemberKind.ngInstanceMethod;
        }
        const methodOrField = isMethod ? 'Method' : 'Field';
        const membership = getMembership(member);
        return memberKindForMethodOrField(accessLevel, membership, methodOrField);
    };
    const testForNg = () => {
        return member.name != null && nameString(member.name).startsWith('ng');
    };
    switch (member.kind) {
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.ConstructSignature:
            return memberKindForConstructor(accessLevel);
        case ts.SyntaxKind.GetAccessor:
            return accessor('Getter');
        case ts.SyntaxKind.SetAccessor:
            return accessor('Setter');
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
            return methodOrField(isFunctionLiteral(member.initializer));
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
            return methodOrField(true);
        default:
            return undefined;
    }
};
class MemberCategory {
    constructor(name, kinds) {
        this.name = name;
        this.kinds = kinds;
    }
    has(kind) {
        return this.kinds.has(kind);
    }
}
const parseOptions = (options) => {
    const { order: orderJson, alphabetize } = getOptionsJson(options);
    const order = orderJson.map((cat) => {
        return typeof cat === 'string'
            ? new MemberCategory(cat.replace(/-/g, ' '), new Set(memberKindFromName(cat)))
            : new MemberCategory(cat.name, new Set(utils_1.flatMap(cat.kinds, memberKindFromName)));
    });
    return { order, alphabetize };
};
const getOptionsJson = (allOptions) => {
    if (allOptions === undefined || allOptions.length === 0 || allOptions[0] === undefined) {
        throw new Error('Got empty options');
    }
    const firstOption = allOptions[0];
    if (typeof firstOption !== 'object') {
        // Undocumented direct string option. Deprecate eventually.
        // presume allOptions to be string[]
        return { order: convertFromOldStyleOptions(allOptions), alphabetize: false };
    }
    return {
        alphabetize: firstOption[OPTION_ALPHABETIZE] === true,
        order: categoryFromOption(firstOption[OPTION_ORDER])
    };
};
const categoryFromOption = (orderOption) => {
    if (Array.isArray(orderOption)) {
        return orderOption;
    }
    const preset = PRESETS.get(orderOption);
    if (preset === undefined) {
        throw new Error(`Bad order: ${JSON.stringify(orderOption)}`);
    }
    return preset;
};
/**
 * Convert from undocumented old-style options.
 * This is designed to mimic the old behavior and should be removed eventually.
 */
const convertFromOldStyleOptions = (options) => {
    const hasOption = (x) => {
        return options.indexOf(x) !== -1;
    };
    let categories = [{ name: 'member', kinds: allMemberKindNames }];
    if (hasOption('variables-before-functions')) {
        categories = splitOldStyleOptions(categories, (kind) => kind.includes('field'), 'field', 'method');
    }
    if (hasOption('static-before-instance')) {
        categories = splitOldStyleOptions(categories, (kind) => kind.includes('static'), 'static', 'instance');
    }
    if (hasOption('public-before-private')) {
        // 'protected' is considered public
        categories = splitOldStyleOptions(categories, (kind) => !kind.includes('private'), 'public', 'private');
    }
    return categories;
};
const splitOldStyleOptions = (categories, filter, a, b) => {
    const newCategories = [];
    for (const cat of categories) {
        const yes = [];
        const no = [];
        for (const kind of cat.kinds) {
            if (filter(kind)) {
                yes.push(kind);
            }
            else {
                no.push(kind);
            }
        }
        const augmentName = (s) => {
            if (a === 'field') {
                // Replace 'member' with 'field'/'method' instead of augmenting.
                return s;
            }
            return `${s} ${cat.name}`;
        };
        newCategories.push({ name: augmentName(a), kinds: yes });
        newCategories.push({ name: augmentName(b), kinds: no });
    }
    return newCategories;
};
const isFunctionLiteral = (node) => {
    if (node === undefined) {
        return false;
    }
    switch (node.kind) {
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
            return true;
        default:
            return false;
    }
};
const decoratedNameString = (member) => {
    if (member.name == null) {
        return '';
    }
    let decoratorNames = '';
    if (member.decorators) {
        decoratorNames = member.decorators.map((decorator) => decorator.getText().replace(/@|(\([^)]*\))/gm, '')).join('');
    }
    return decoratorNames + nameString(member.name);
};
const nameString = (name) => {
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NumericLiteral:
            return name.text;
        default:
            return '';
    }
};
/**
 * Returns the last element of an array. (Or undefined).
 */
const arrayLast = (array) => {
    if (array && array.length) {
        return array[array.length - 1];
    }
};
/**
 * Array.prototype.findIndex, but the last index.
 */
const arrayFindLastIndex = (array, predicate) => {
    if (array && array.length) {
        for (let i = array.length; i-- > 0;) {
            if (predicate(array[i], i, array)) {
                return i;
            }
        }
    }
    return -1;
};
/**
 * Applies a Replacement to a part of the text which starts at offset.
 * See also Replacement.apply
 */
const applyReplacementOffset = (content, replacement, offset) => {
    return content.substring(0, replacement.start - offset)
        + replacement.text
        + content.substring(replacement.start - offset + replacement.length);
};
/**
 * Get the indexes of the boundaries between nodes in the node array. The following points must be taken into account:
 * - Trivia should stay with its corresponding node (comments on the same line following the token belong to the
 *   previous token, the rest to the next).
 * - Reordering the subtexts should not result in code being commented out due to being moved between a '//' and
 *   the following newline.
 * - The end of one node must be the start of the next, otherwise the intravening whitespace will be lost when
 *   reordering.
 *
 * Hence, the boundaries are chosen to be _after_ the newline following the node, or the beginning of the next token,
 * if that comes first.
 */
const getSplitIndexes = (members, text) => {
    const result = members.map((member) => getNextSplitIndex(text, member.getFullStart()));
    result.push(getNextSplitIndex(text, arrayLast(members).getEnd()));
    return result;
};
/**
 * Calculates the index after the newline following pos, or the beginning of the next token, whichever comes first.
 * See also getSplitIndexes.
 * This method is a modified version of TypeScript's internal iterateCommentRanges const. => =
 */
const getNextSplitIndex = (text, pos) => {
    scan: while (pos >= 0 && pos < text.length) {
        const ch = text.charCodeAt(pos);
        switch (ch) {
            case 13 /* carriageReturn */:
                if (text.charCodeAt(pos + 1) === 10 /* lineFeed */) {
                    pos++;
                }
            // falls through
            case 10 /* lineFeed */:
                pos++;
                // split is after new line
                return pos;
            case 9 /* tab */:
            case 11 /* verticalTab */:
            case 12 /* formFeed */:
            case 32 /* space */:
                // skip whitespace
                pos++;
                continue;
            case 47 /* slash */:
                const nextChar = text.charCodeAt(pos + 1);
                if (nextChar === 47 /* slash */ || nextChar === 42 /* asterisk */) {
                    const isSingleLineComment = nextChar === 47 /* slash */;
                    pos += 2;
                    if (isSingleLineComment) {
                        while (pos < text.length) {
                            if (ts.isLineBreak(text.charCodeAt(pos))) {
                                // the comment ends here, go back to default logic to handle parsing new line and result
                                continue scan;
                            }
                            pos++;
                        }
                    }
                    else {
                        while (pos < text.length) {
                            if (text.charCodeAt(pos) === 42 /* asterisk */
                                && text.charCodeAt(pos + 1) === 47 /* slash */) {
                                pos += 2;
                                continue scan;
                            }
                            pos++;
                        }
                    }
                    // if we arrive here, it's because pos == text.length
                    return pos;
                }
                break scan;
            default:
                // skip whitespace:
                if (ch > 127 /* maxAsciiCharacter */ && (ts.isWhiteSpaceLike(ch))) {
                    pos++;
                    continue;
                }
                break scan;
        }
    }
    return pos;
};
