window.__ModuleLoader__.load({
	id: "dsh-plugin-hub",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __export = (target, all) => {
		  for (var name in all)
		    __defProp(target, name, { get: all[name], enumerable: true });
		};
		var __copyProps = (to, from, except, desc) => {
		  if (from && typeof from === "object" || typeof from === "function") {
		    for (let key of __getOwnPropNames(from))
		      if (!__hasOwnProp.call(to, key) && key !== except)
		        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
		  }
		  return to;
		};
		var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

		// src/client/index.tsx
		var index_exports = {};
		__export(index_exports, {
		  apply: () => apply,
		  default: () => index_default,
		  inject: () => inject
		});
		module.exports = __toCommonJS(index_exports);
		var import_react_dom2 = require("react-dom");
		var import_react8 = require("react");
		var import_dsh_client_ui_primitives4 = require("@deepseek-ai/dsh-client-ui-primitives");

		// node_modules/zod/v4/classic/external.js
		var external_exports = {};
		__export(external_exports, {
		  $brand: () => $brand,
		  $input: () => $input,
		  $output: () => $output,
		  NEVER: () => NEVER,
		  TimePrecision: () => TimePrecision,
		  ZodAny: () => ZodAny,
		  ZodArray: () => ZodArray,
		  ZodBase64: () => ZodBase64,
		  ZodBase64URL: () => ZodBase64URL,
		  ZodBigInt: () => ZodBigInt,
		  ZodBigIntFormat: () => ZodBigIntFormat,
		  ZodBoolean: () => ZodBoolean,
		  ZodCIDRv4: () => ZodCIDRv4,
		  ZodCIDRv6: () => ZodCIDRv6,
		  ZodCUID: () => ZodCUID,
		  ZodCUID2: () => ZodCUID2,
		  ZodCatch: () => ZodCatch,
		  ZodCodec: () => ZodCodec,
		  ZodCustom: () => ZodCustom,
		  ZodCustomStringFormat: () => ZodCustomStringFormat,
		  ZodDate: () => ZodDate,
		  ZodDefault: () => ZodDefault,
		  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
		  ZodE164: () => ZodE164,
		  ZodEmail: () => ZodEmail,
		  ZodEmoji: () => ZodEmoji,
		  ZodEnum: () => ZodEnum,
		  ZodError: () => ZodError,
		  ZodExactOptional: () => ZodExactOptional,
		  ZodFile: () => ZodFile,
		  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
		  ZodFunction: () => ZodFunction,
		  ZodGUID: () => ZodGUID,
		  ZodIPv4: () => ZodIPv4,
		  ZodIPv6: () => ZodIPv6,
		  ZodISODate: () => ZodISODate,
		  ZodISODateTime: () => ZodISODateTime,
		  ZodISODuration: () => ZodISODuration,
		  ZodISOTime: () => ZodISOTime,
		  ZodIntersection: () => ZodIntersection,
		  ZodIssueCode: () => ZodIssueCode,
		  ZodJWT: () => ZodJWT,
		  ZodKSUID: () => ZodKSUID,
		  ZodLazy: () => ZodLazy,
		  ZodLiteral: () => ZodLiteral,
		  ZodMAC: () => ZodMAC,
		  ZodMap: () => ZodMap,
		  ZodNaN: () => ZodNaN,
		  ZodNanoID: () => ZodNanoID,
		  ZodNever: () => ZodNever,
		  ZodNonOptional: () => ZodNonOptional,
		  ZodNull: () => ZodNull,
		  ZodNullable: () => ZodNullable,
		  ZodNumber: () => ZodNumber,
		  ZodNumberFormat: () => ZodNumberFormat,
		  ZodObject: () => ZodObject,
		  ZodOptional: () => ZodOptional,
		  ZodPipe: () => ZodPipe,
		  ZodPrefault: () => ZodPrefault,
		  ZodPreprocess: () => ZodPreprocess,
		  ZodPromise: () => ZodPromise,
		  ZodReadonly: () => ZodReadonly,
		  ZodRealError: () => ZodRealError,
		  ZodRecord: () => ZodRecord,
		  ZodSet: () => ZodSet,
		  ZodString: () => ZodString,
		  ZodStringFormat: () => ZodStringFormat,
		  ZodSuccess: () => ZodSuccess,
		  ZodSymbol: () => ZodSymbol,
		  ZodTemplateLiteral: () => ZodTemplateLiteral,
		  ZodTransform: () => ZodTransform,
		  ZodTuple: () => ZodTuple,
		  ZodType: () => ZodType,
		  ZodULID: () => ZodULID,
		  ZodURL: () => ZodURL,
		  ZodUUID: () => ZodUUID,
		  ZodUndefined: () => ZodUndefined,
		  ZodUnion: () => ZodUnion,
		  ZodUnknown: () => ZodUnknown,
		  ZodVoid: () => ZodVoid,
		  ZodXID: () => ZodXID,
		  ZodXor: () => ZodXor,
		  _ZodString: () => _ZodString,
		  _default: () => _default2,
		  _function: () => _function,
		  any: () => any,
		  array: () => array,
		  base64: () => base642,
		  base64url: () => base64url2,
		  bigint: () => bigint2,
		  boolean: () => boolean2,
		  catch: () => _catch2,
		  check: () => check,
		  cidrv4: () => cidrv42,
		  cidrv6: () => cidrv62,
		  clone: () => clone,
		  codec: () => codec,
		  coerce: () => coerce_exports,
		  config: () => config,
		  core: () => core_exports2,
		  cuid: () => cuid3,
		  cuid2: () => cuid22,
		  custom: () => custom,
		  date: () => date3,
		  decode: () => decode2,
		  decodeAsync: () => decodeAsync2,
		  describe: () => describe2,
		  discriminatedUnion: () => discriminatedUnion,
		  e164: () => e1642,
		  email: () => email2,
		  emoji: () => emoji2,
		  encode: () => encode2,
		  encodeAsync: () => encodeAsync2,
		  endsWith: () => _endsWith,
		  enum: () => _enum2,
		  exactOptional: () => exactOptional,
		  file: () => file,
		  flattenError: () => flattenError,
		  float32: () => float32,
		  float64: () => float64,
		  formatError: () => formatError,
		  fromJSONSchema: () => fromJSONSchema,
		  function: () => _function,
		  getErrorMap: () => getErrorMap,
		  globalRegistry: () => globalRegistry,
		  gt: () => _gt,
		  gte: () => _gte,
		  guid: () => guid2,
		  hash: () => hash,
		  hex: () => hex2,
		  hostname: () => hostname2,
		  httpUrl: () => httpUrl,
		  includes: () => _includes,
		  instanceof: () => _instanceof,
		  int: () => int,
		  int32: () => int32,
		  int64: () => int64,
		  intersection: () => intersection,
		  invertCodec: () => invertCodec,
		  ipv4: () => ipv42,
		  ipv6: () => ipv62,
		  iso: () => iso_exports,
		  json: () => json,
		  jwt: () => jwt,
		  keyof: () => keyof,
		  ksuid: () => ksuid2,
		  lazy: () => lazy,
		  length: () => _length,
		  literal: () => literal,
		  locales: () => locales_exports,
		  looseObject: () => looseObject,
		  looseRecord: () => looseRecord,
		  lowercase: () => _lowercase,
		  lt: () => _lt,
		  lte: () => _lte,
		  mac: () => mac2,
		  map: () => map,
		  maxLength: () => _maxLength,
		  maxSize: () => _maxSize,
		  meta: () => meta2,
		  mime: () => _mime,
		  minLength: () => _minLength,
		  minSize: () => _minSize,
		  multipleOf: () => _multipleOf,
		  nan: () => nan,
		  nanoid: () => nanoid2,
		  nativeEnum: () => nativeEnum,
		  negative: () => _negative,
		  never: () => never,
		  nonnegative: () => _nonnegative,
		  nonoptional: () => nonoptional,
		  nonpositive: () => _nonpositive,
		  normalize: () => _normalize,
		  null: () => _null3,
		  nullable: () => nullable,
		  nullish: () => nullish2,
		  number: () => number2,
		  object: () => object,
		  optional: () => optional,
		  overwrite: () => _overwrite,
		  parse: () => parse2,
		  parseAsync: () => parseAsync2,
		  partialRecord: () => partialRecord,
		  pipe: () => pipe,
		  positive: () => _positive,
		  prefault: () => prefault,
		  preprocess: () => preprocess,
		  prettifyError: () => prettifyError,
		  promise: () => promise,
		  property: () => _property,
		  readonly: () => readonly,
		  record: () => record,
		  refine: () => refine,
		  regex: () => _regex,
		  regexes: () => regexes_exports,
		  registry: () => registry,
		  safeDecode: () => safeDecode2,
		  safeDecodeAsync: () => safeDecodeAsync2,
		  safeEncode: () => safeEncode2,
		  safeEncodeAsync: () => safeEncodeAsync2,
		  safeParse: () => safeParse2,
		  safeParseAsync: () => safeParseAsync2,
		  set: () => set,
		  setErrorMap: () => setErrorMap,
		  size: () => _size,
		  slugify: () => _slugify,
		  startsWith: () => _startsWith,
		  strictObject: () => strictObject,
		  string: () => string2,
		  stringFormat: () => stringFormat,
		  stringbool: () => stringbool,
		  success: () => success,
		  superRefine: () => superRefine,
		  symbol: () => symbol,
		  templateLiteral: () => templateLiteral,
		  toJSONSchema: () => toJSONSchema,
		  toLowerCase: () => _toLowerCase,
		  toUpperCase: () => _toUpperCase,
		  transform: () => transform,
		  treeifyError: () => treeifyError,
		  trim: () => _trim,
		  tuple: () => tuple,
		  uint32: () => uint32,
		  uint64: () => uint64,
		  ulid: () => ulid2,
		  undefined: () => _undefined3,
		  union: () => union,
		  unknown: () => unknown,
		  uppercase: () => _uppercase,
		  url: () => url,
		  util: () => util_exports,
		  uuid: () => uuid2,
		  uuidv4: () => uuidv4,
		  uuidv6: () => uuidv6,
		  uuidv7: () => uuidv7,
		  void: () => _void2,
		  xid: () => xid2,
		  xor: () => xor
		});

		// node_modules/zod/v4/core/index.js
		var core_exports2 = {};
		__export(core_exports2, {
		  $ZodAny: () => $ZodAny,
		  $ZodArray: () => $ZodArray,
		  $ZodAsyncError: () => $ZodAsyncError,
		  $ZodBase64: () => $ZodBase64,
		  $ZodBase64URL: () => $ZodBase64URL,
		  $ZodBigInt: () => $ZodBigInt,
		  $ZodBigIntFormat: () => $ZodBigIntFormat,
		  $ZodBoolean: () => $ZodBoolean,
		  $ZodCIDRv4: () => $ZodCIDRv4,
		  $ZodCIDRv6: () => $ZodCIDRv6,
		  $ZodCUID: () => $ZodCUID,
		  $ZodCUID2: () => $ZodCUID2,
		  $ZodCatch: () => $ZodCatch,
		  $ZodCheck: () => $ZodCheck,
		  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
		  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
		  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
		  $ZodCheckIncludes: () => $ZodCheckIncludes,
		  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
		  $ZodCheckLessThan: () => $ZodCheckLessThan,
		  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
		  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
		  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
		  $ZodCheckMimeType: () => $ZodCheckMimeType,
		  $ZodCheckMinLength: () => $ZodCheckMinLength,
		  $ZodCheckMinSize: () => $ZodCheckMinSize,
		  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
		  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
		  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
		  $ZodCheckProperty: () => $ZodCheckProperty,
		  $ZodCheckRegex: () => $ZodCheckRegex,
		  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
		  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
		  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
		  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
		  $ZodCodec: () => $ZodCodec,
		  $ZodCustom: () => $ZodCustom,
		  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
		  $ZodDate: () => $ZodDate,
		  $ZodDefault: () => $ZodDefault,
		  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
		  $ZodE164: () => $ZodE164,
		  $ZodEmail: () => $ZodEmail,
		  $ZodEmoji: () => $ZodEmoji,
		  $ZodEncodeError: () => $ZodEncodeError,
		  $ZodEnum: () => $ZodEnum,
		  $ZodError: () => $ZodError,
		  $ZodExactOptional: () => $ZodExactOptional,
		  $ZodFile: () => $ZodFile,
		  $ZodFunction: () => $ZodFunction,
		  $ZodGUID: () => $ZodGUID,
		  $ZodIPv4: () => $ZodIPv4,
		  $ZodIPv6: () => $ZodIPv6,
		  $ZodISODate: () => $ZodISODate,
		  $ZodISODateTime: () => $ZodISODateTime,
		  $ZodISODuration: () => $ZodISODuration,
		  $ZodISOTime: () => $ZodISOTime,
		  $ZodIntersection: () => $ZodIntersection,
		  $ZodJWT: () => $ZodJWT,
		  $ZodKSUID: () => $ZodKSUID,
		  $ZodLazy: () => $ZodLazy,
		  $ZodLiteral: () => $ZodLiteral,
		  $ZodMAC: () => $ZodMAC,
		  $ZodMap: () => $ZodMap,
		  $ZodNaN: () => $ZodNaN,
		  $ZodNanoID: () => $ZodNanoID,
		  $ZodNever: () => $ZodNever,
		  $ZodNonOptional: () => $ZodNonOptional,
		  $ZodNull: () => $ZodNull,
		  $ZodNullable: () => $ZodNullable,
		  $ZodNumber: () => $ZodNumber,
		  $ZodNumberFormat: () => $ZodNumberFormat,
		  $ZodObject: () => $ZodObject,
		  $ZodObjectJIT: () => $ZodObjectJIT,
		  $ZodOptional: () => $ZodOptional,
		  $ZodPipe: () => $ZodPipe,
		  $ZodPrefault: () => $ZodPrefault,
		  $ZodPreprocess: () => $ZodPreprocess,
		  $ZodPromise: () => $ZodPromise,
		  $ZodReadonly: () => $ZodReadonly,
		  $ZodRealError: () => $ZodRealError,
		  $ZodRecord: () => $ZodRecord,
		  $ZodRegistry: () => $ZodRegistry,
		  $ZodSet: () => $ZodSet,
		  $ZodString: () => $ZodString,
		  $ZodStringFormat: () => $ZodStringFormat,
		  $ZodSuccess: () => $ZodSuccess,
		  $ZodSymbol: () => $ZodSymbol,
		  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
		  $ZodTransform: () => $ZodTransform,
		  $ZodTuple: () => $ZodTuple,
		  $ZodType: () => $ZodType,
		  $ZodULID: () => $ZodULID,
		  $ZodURL: () => $ZodURL,
		  $ZodUUID: () => $ZodUUID,
		  $ZodUndefined: () => $ZodUndefined,
		  $ZodUnion: () => $ZodUnion,
		  $ZodUnknown: () => $ZodUnknown,
		  $ZodVoid: () => $ZodVoid,
		  $ZodXID: () => $ZodXID,
		  $ZodXor: () => $ZodXor,
		  $brand: () => $brand,
		  $constructor: () => $constructor,
		  $input: () => $input,
		  $output: () => $output,
		  Doc: () => Doc,
		  JSONSchema: () => json_schema_exports,
		  JSONSchemaGenerator: () => JSONSchemaGenerator,
		  NEVER: () => NEVER,
		  TimePrecision: () => TimePrecision,
		  _any: () => _any,
		  _array: () => _array,
		  _base64: () => _base64,
		  _base64url: () => _base64url,
		  _bigint: () => _bigint,
		  _boolean: () => _boolean,
		  _catch: () => _catch,
		  _check: () => _check,
		  _cidrv4: () => _cidrv4,
		  _cidrv6: () => _cidrv6,
		  _coercedBigint: () => _coercedBigint,
		  _coercedBoolean: () => _coercedBoolean,
		  _coercedDate: () => _coercedDate,
		  _coercedNumber: () => _coercedNumber,
		  _coercedString: () => _coercedString,
		  _cuid: () => _cuid,
		  _cuid2: () => _cuid2,
		  _custom: () => _custom,
		  _date: () => _date,
		  _decode: () => _decode,
		  _decodeAsync: () => _decodeAsync,
		  _default: () => _default,
		  _discriminatedUnion: () => _discriminatedUnion,
		  _e164: () => _e164,
		  _email: () => _email,
		  _emoji: () => _emoji2,
		  _encode: () => _encode,
		  _encodeAsync: () => _encodeAsync,
		  _endsWith: () => _endsWith,
		  _enum: () => _enum,
		  _file: () => _file,
		  _float32: () => _float32,
		  _float64: () => _float64,
		  _gt: () => _gt,
		  _gte: () => _gte,
		  _guid: () => _guid,
		  _includes: () => _includes,
		  _int: () => _int,
		  _int32: () => _int32,
		  _int64: () => _int64,
		  _intersection: () => _intersection,
		  _ipv4: () => _ipv4,
		  _ipv6: () => _ipv6,
		  _isoDate: () => _isoDate,
		  _isoDateTime: () => _isoDateTime,
		  _isoDuration: () => _isoDuration,
		  _isoTime: () => _isoTime,
		  _jwt: () => _jwt,
		  _ksuid: () => _ksuid,
		  _lazy: () => _lazy,
		  _length: () => _length,
		  _literal: () => _literal,
		  _lowercase: () => _lowercase,
		  _lt: () => _lt,
		  _lte: () => _lte,
		  _mac: () => _mac,
		  _map: () => _map,
		  _max: () => _lte,
		  _maxLength: () => _maxLength,
		  _maxSize: () => _maxSize,
		  _mime: () => _mime,
		  _min: () => _gte,
		  _minLength: () => _minLength,
		  _minSize: () => _minSize,
		  _multipleOf: () => _multipleOf,
		  _nan: () => _nan,
		  _nanoid: () => _nanoid,
		  _nativeEnum: () => _nativeEnum,
		  _negative: () => _negative,
		  _never: () => _never,
		  _nonnegative: () => _nonnegative,
		  _nonoptional: () => _nonoptional,
		  _nonpositive: () => _nonpositive,
		  _normalize: () => _normalize,
		  _null: () => _null2,
		  _nullable: () => _nullable,
		  _number: () => _number,
		  _optional: () => _optional,
		  _overwrite: () => _overwrite,
		  _parse: () => _parse,
		  _parseAsync: () => _parseAsync,
		  _pipe: () => _pipe,
		  _positive: () => _positive,
		  _promise: () => _promise,
		  _property: () => _property,
		  _readonly: () => _readonly,
		  _record: () => _record,
		  _refine: () => _refine,
		  _regex: () => _regex,
		  _safeDecode: () => _safeDecode,
		  _safeDecodeAsync: () => _safeDecodeAsync,
		  _safeEncode: () => _safeEncode,
		  _safeEncodeAsync: () => _safeEncodeAsync,
		  _safeParse: () => _safeParse,
		  _safeParseAsync: () => _safeParseAsync,
		  _set: () => _set,
		  _size: () => _size,
		  _slugify: () => _slugify,
		  _startsWith: () => _startsWith,
		  _string: () => _string,
		  _stringFormat: () => _stringFormat,
		  _stringbool: () => _stringbool,
		  _success: () => _success,
		  _superRefine: () => _superRefine,
		  _symbol: () => _symbol,
		  _templateLiteral: () => _templateLiteral,
		  _toLowerCase: () => _toLowerCase,
		  _toUpperCase: () => _toUpperCase,
		  _transform: () => _transform,
		  _trim: () => _trim,
		  _tuple: () => _tuple,
		  _uint32: () => _uint32,
		  _uint64: () => _uint64,
		  _ulid: () => _ulid,
		  _undefined: () => _undefined2,
		  _union: () => _union,
		  _unknown: () => _unknown,
		  _uppercase: () => _uppercase,
		  _url: () => _url,
		  _uuid: () => _uuid,
		  _uuidv4: () => _uuidv4,
		  _uuidv6: () => _uuidv6,
		  _uuidv7: () => _uuidv7,
		  _void: () => _void,
		  _xid: () => _xid,
		  _xor: () => _xor,
		  clone: () => clone,
		  config: () => config,
		  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
		  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
		  decode: () => decode,
		  decodeAsync: () => decodeAsync,
		  describe: () => describe,
		  encode: () => encode,
		  encodeAsync: () => encodeAsync,
		  extractDefs: () => extractDefs,
		  finalize: () => finalize,
		  flattenError: () => flattenError,
		  formatError: () => formatError,
		  globalConfig: () => globalConfig,
		  globalRegistry: () => globalRegistry,
		  initializeContext: () => initializeContext,
		  isValidBase64: () => isValidBase64,
		  isValidBase64URL: () => isValidBase64URL,
		  isValidJWT: () => isValidJWT,
		  locales: () => locales_exports,
		  meta: () => meta,
		  parse: () => parse,
		  parseAsync: () => parseAsync,
		  prettifyError: () => prettifyError,
		  process: () => process,
		  regexes: () => regexes_exports,
		  registry: () => registry,
		  safeDecode: () => safeDecode,
		  safeDecodeAsync: () => safeDecodeAsync,
		  safeEncode: () => safeEncode,
		  safeEncodeAsync: () => safeEncodeAsync,
		  safeParse: () => safeParse,
		  safeParseAsync: () => safeParseAsync,
		  toDotPath: () => toDotPath,
		  toJSONSchema: () => toJSONSchema,
		  treeifyError: () => treeifyError,
		  util: () => util_exports,
		  version: () => version
		});

		// node_modules/zod/v4/core/core.js
		var _a;
		var NEVER = /* @__PURE__ */ Object.freeze({
		  status: "aborted"
		});
		// @__NO_SIDE_EFFECTS__
		function $constructor(name, initializer3, params) {
		  function init(inst, def) {
		    if (!inst._zod) {
		      Object.defineProperty(inst, "_zod", {
		        value: {
		          def,
		          constr: _,
		          traits: /* @__PURE__ */ new Set()
		        },
		        enumerable: false
		      });
		    }
		    if (inst._zod.traits.has(name)) {
		      return;
		    }
		    inst._zod.traits.add(name);
		    initializer3(inst, def);
		    const proto = _.prototype;
		    const keys = Object.keys(proto);
		    for (let i = 0; i < keys.length; i++) {
		      const k = keys[i];
		      if (!(k in inst)) {
		        inst[k] = proto[k].bind(inst);
		      }
		    }
		  }
		  const Parent = params?.Parent ?? Object;
		  class Definition extends Parent {
		  }
		  Object.defineProperty(Definition, "name", { value: name });
		  function _(def) {
		    var _a3;
		    const inst = params?.Parent ? new Definition() : this;
		    init(inst, def);
		    (_a3 = inst._zod).deferred ?? (_a3.deferred = []);
		    for (const fn of inst._zod.deferred) {
		      fn();
		    }
		    return inst;
		  }
		  Object.defineProperty(_, "init", { value: init });
		  Object.defineProperty(_, Symbol.hasInstance, {
		    value: (inst) => {
		      if (params?.Parent && inst instanceof params.Parent)
		        return true;
		      return inst?._zod?.traits?.has(name);
		    }
		  });
		  Object.defineProperty(_, "name", { value: name });
		  return _;
		}
		var $brand = Symbol("zod_brand");
		var $ZodAsyncError = class extends Error {
		  constructor() {
		    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
		  }
		};
		var $ZodEncodeError = class extends Error {
		  constructor(name) {
		    super(`Encountered unidirectional transform during encode: ${name}`);
		    this.name = "ZodEncodeError";
		  }
		};
		(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
		var globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
		  if (newConfig)
		    Object.assign(globalConfig, newConfig);
		  return globalConfig;
		}

		// node_modules/zod/v4/core/util.js
		var util_exports = {};
		__export(util_exports, {
		  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
		  Class: () => Class,
		  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
		  aborted: () => aborted,
		  allowsEval: () => allowsEval,
		  assert: () => assert,
		  assertEqual: () => assertEqual,
		  assertIs: () => assertIs,
		  assertNever: () => assertNever,
		  assertNotEqual: () => assertNotEqual,
		  assignProp: () => assignProp,
		  base64ToUint8Array: () => base64ToUint8Array,
		  base64urlToUint8Array: () => base64urlToUint8Array,
		  cached: () => cached,
		  captureStackTrace: () => captureStackTrace,
		  cleanEnum: () => cleanEnum,
		  cleanRegex: () => cleanRegex,
		  clone: () => clone,
		  cloneDef: () => cloneDef,
		  createTransparentProxy: () => createTransparentProxy,
		  defineLazy: () => defineLazy,
		  esc: () => esc,
		  escapeRegex: () => escapeRegex,
		  explicitlyAborted: () => explicitlyAborted,
		  extend: () => extend,
		  finalizeIssue: () => finalizeIssue,
		  floatSafeRemainder: () => floatSafeRemainder,
		  getElementAtPath: () => getElementAtPath,
		  getEnumValues: () => getEnumValues,
		  getLengthableOrigin: () => getLengthableOrigin,
		  getParsedType: () => getParsedType,
		  getSizableOrigin: () => getSizableOrigin,
		  hexToUint8Array: () => hexToUint8Array,
		  isObject: () => isObject,
		  isPlainObject: () => isPlainObject,
		  issue: () => issue,
		  joinValues: () => joinValues,
		  jsonStringifyReplacer: () => jsonStringifyReplacer,
		  merge: () => merge,
		  mergeDefs: () => mergeDefs,
		  normalizeParams: () => normalizeParams,
		  nullish: () => nullish,
		  numKeys: () => numKeys,
		  objectClone: () => objectClone,
		  omit: () => omit,
		  optionalKeys: () => optionalKeys,
		  parsedType: () => parsedType,
		  partial: () => partial,
		  pick: () => pick,
		  prefixIssues: () => prefixIssues,
		  primitiveTypes: () => primitiveTypes,
		  promiseAllObject: () => promiseAllObject,
		  propertyKeyTypes: () => propertyKeyTypes,
		  randomString: () => randomString,
		  required: () => required,
		  safeExtend: () => safeExtend,
		  shallowClone: () => shallowClone,
		  slugify: () => slugify,
		  stringifyPrimitive: () => stringifyPrimitive,
		  uint8ArrayToBase64: () => uint8ArrayToBase64,
		  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
		  uint8ArrayToHex: () => uint8ArrayToHex,
		  unwrapMessage: () => unwrapMessage
		});
		function assertEqual(val) {
		  return val;
		}
		function assertNotEqual(val) {
		  return val;
		}
		function assertIs(_arg) {
		}
		function assertNever(_x) {
		  throw new Error("Unexpected value in exhaustive check");
		}
		function assert(_) {
		}
		function getEnumValues(entries) {
		  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
		  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		  return values;
		}
		function joinValues(array2, separator = "|") {
		  return array2.map((val) => stringifyPrimitive(val)).join(separator);
		}
		function jsonStringifyReplacer(_, value) {
		  if (typeof value === "bigint")
		    return value.toString();
		  return value;
		}
		function cached(getter) {
		  const set2 = false;
		  return {
		    get value() {
		      if (!set2) {
		        const value = getter();
		        Object.defineProperty(this, "value", { value });
		        return value;
		      }
		      throw new Error("cached value already set");
		    }
		  };
		}
		function nullish(input) {
		  return input === null || input === void 0;
		}
		function cleanRegex(source) {
		  const start = source.startsWith("^") ? 1 : 0;
		  const end = source.endsWith("$") ? source.length - 1 : source.length;
		  return source.slice(start, end);
		}
		function floatSafeRemainder(val, step) {
		  const ratio = val / step;
		  const roundedRatio = Math.round(ratio);
		  const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
		  if (Math.abs(ratio - roundedRatio) < tolerance)
		    return 0;
		  return ratio - roundedRatio;
		}
		var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
		function defineLazy(object2, key, getter) {
		  let value = void 0;
		  Object.defineProperty(object2, key, {
		    get() {
		      if (value === EVALUATING) {
		        return void 0;
		      }
		      if (value === void 0) {
		        value = EVALUATING;
		        value = getter();
		      }
		      return value;
		    },
		    set(v) {
		      Object.defineProperty(object2, key, {
		        value: v
		        // configurable: true,
		      });
		    },
		    configurable: true
		  });
		}
		function objectClone(obj) {
		  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
		}
		function assignProp(target, prop, value) {
		  Object.defineProperty(target, prop, {
		    value,
		    writable: true,
		    enumerable: true,
		    configurable: true
		  });
		}
		function mergeDefs(...defs) {
		  const mergedDescriptors = {};
		  for (const def of defs) {
		    const descriptors2 = Object.getOwnPropertyDescriptors(def);
		    Object.assign(mergedDescriptors, descriptors2);
		  }
		  return Object.defineProperties({}, mergedDescriptors);
		}
		function cloneDef(schema) {
		  return mergeDefs(schema._zod.def);
		}
		function getElementAtPath(obj, path) {
		  if (!path)
		    return obj;
		  return path.reduce((acc, key) => acc?.[key], obj);
		}
		function promiseAllObject(promisesObj) {
		  const keys = Object.keys(promisesObj);
		  const promises = keys.map((key) => promisesObj[key]);
		  return Promise.all(promises).then((results) => {
		    const resolvedObj = {};
		    for (let i = 0; i < keys.length; i++) {
		      resolvedObj[keys[i]] = results[i];
		    }
		    return resolvedObj;
		  });
		}
		function randomString(length = 10) {
		  const chars = "abcdefghijklmnopqrstuvwxyz";
		  let str = "";
		  for (let i = 0; i < length; i++) {
		    str += chars[Math.floor(Math.random() * chars.length)];
		  }
		  return str;
		}
		function esc(str) {
		  return JSON.stringify(str);
		}
		function slugify(input) {
		  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
		};
		function isObject(data) {
		  return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		var allowsEval = /* @__PURE__ */ cached(() => {
		  if (globalConfig.jitless) {
		    return false;
		  }
		  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
		    return false;
		  }
		  try {
		    const F = Function;
		    new F("");
		    return true;
		  } catch (_) {
		    return false;
		  }
		});
		function isPlainObject(o) {
		  if (isObject(o) === false)
		    return false;
		  const ctor = o.constructor;
		  if (ctor === void 0)
		    return true;
		  if (typeof ctor !== "function")
		    return true;
		  const prot = ctor.prototype;
		  if (isObject(prot) === false)
		    return false;
		  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
		    return false;
		  }
		  return true;
		}
		function shallowClone(o) {
		  if (isPlainObject(o))
		    return { ...o };
		  if (Array.isArray(o))
		    return [...o];
		  if (o instanceof Map)
		    return new Map(o);
		  if (o instanceof Set)
		    return new Set(o);
		  return o;
		}
		function numKeys(data) {
		  let keyCount = 0;
		  for (const key in data) {
		    if (Object.prototype.hasOwnProperty.call(data, key)) {
		      keyCount++;
		    }
		  }
		  return keyCount;
		}
		var getParsedType = (data) => {
		  const t = typeof data;
		  switch (t) {
		    case "undefined":
		      return "undefined";
		    case "string":
		      return "string";
		    case "number":
		      return Number.isNaN(data) ? "nan" : "number";
		    case "boolean":
		      return "boolean";
		    case "function":
		      return "function";
		    case "bigint":
		      return "bigint";
		    case "symbol":
		      return "symbol";
		    case "object":
		      if (Array.isArray(data)) {
		        return "array";
		      }
		      if (data === null) {
		        return "null";
		      }
		      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
		        return "promise";
		      }
		      if (typeof Map !== "undefined" && data instanceof Map) {
		        return "map";
		      }
		      if (typeof Set !== "undefined" && data instanceof Set) {
		        return "set";
		      }
		      if (typeof Date !== "undefined" && data instanceof Date) {
		        return "date";
		      }
		      if (typeof File !== "undefined" && data instanceof File) {
		        return "file";
		      }
		      return "object";
		    default:
		      throw new Error(`Unknown data type: ${t}`);
		  }
		};
		var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
		var primitiveTypes = /* @__PURE__ */ new Set([
		  "string",
		  "number",
		  "bigint",
		  "boolean",
		  "symbol",
		  "undefined"
		]);
		function escapeRegex(str) {
		  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
		  const cl = new inst._zod.constr(def ?? inst._zod.def);
		  if (!def || params?.parent)
		    cl._zod.parent = inst;
		  return cl;
		}
		function normalizeParams(_params) {
		  const params = _params;
		  if (!params)
		    return {};
		  if (typeof params === "string")
		    return { error: () => params };
		  if (params?.message !== void 0) {
		    if (params?.error !== void 0)
		      throw new Error("Cannot specify both `message` and `error` params");
		    params.error = params.message;
		  }
		  delete params.message;
		  if (typeof params.error === "string")
		    return { ...params, error: () => params.error };
		  return params;
		}
		function createTransparentProxy(getter) {
		  let target;
		  return new Proxy({}, {
		    get(_, prop, receiver) {
		      target ?? (target = getter());
		      return Reflect.get(target, prop, receiver);
		    },
		    set(_, prop, value, receiver) {
		      target ?? (target = getter());
		      return Reflect.set(target, prop, value, receiver);
		    },
		    has(_, prop) {
		      target ?? (target = getter());
		      return Reflect.has(target, prop);
		    },
		    deleteProperty(_, prop) {
		      target ?? (target = getter());
		      return Reflect.deleteProperty(target, prop);
		    },
		    ownKeys(_) {
		      target ?? (target = getter());
		      return Reflect.ownKeys(target);
		    },
		    getOwnPropertyDescriptor(_, prop) {
		      target ?? (target = getter());
		      return Reflect.getOwnPropertyDescriptor(target, prop);
		    },
		    defineProperty(_, prop, descriptor2) {
		      target ?? (target = getter());
		      return Reflect.defineProperty(target, prop, descriptor2);
		    }
		  });
		}
		function stringifyPrimitive(value) {
		  if (typeof value === "bigint")
		    return value.toString() + "n";
		  if (typeof value === "string")
		    return `"${value}"`;
		  return `${value}`;
		}
		function optionalKeys(shape) {
		  return Object.keys(shape).filter((k) => {
		    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
		  });
		}
		var NUMBER_FORMAT_RANGES = {
		  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
		  int32: [-2147483648, 2147483647],
		  uint32: [0, 4294967295],
		  float32: [-34028234663852886e22, 34028234663852886e22],
		  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		};
		var BIGINT_FORMAT_RANGES = {
		  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
		  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
		};
		function pick(schema, mask) {
		  const currDef = schema._zod.def;
		  const checks = currDef.checks;
		  const hasChecks = checks && checks.length > 0;
		  if (hasChecks) {
		    throw new Error(".pick() cannot be used on object schemas containing refinements");
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const newShape = {};
		      for (const key in mask) {
		        if (!(key in currDef.shape)) {
		          throw new Error(`Unrecognized key: "${key}"`);
		        }
		        if (!mask[key])
		          continue;
		        newShape[key] = currDef.shape[key];
		      }
		      assignProp(this, "shape", newShape);
		      return newShape;
		    },
		    checks: []
		  });
		  return clone(schema, def);
		}
		function omit(schema, mask) {
		  const currDef = schema._zod.def;
		  const checks = currDef.checks;
		  const hasChecks = checks && checks.length > 0;
		  if (hasChecks) {
		    throw new Error(".omit() cannot be used on object schemas containing refinements");
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const newShape = { ...schema._zod.def.shape };
		      for (const key in mask) {
		        if (!(key in currDef.shape)) {
		          throw new Error(`Unrecognized key: "${key}"`);
		        }
		        if (!mask[key])
		          continue;
		        delete newShape[key];
		      }
		      assignProp(this, "shape", newShape);
		      return newShape;
		    },
		    checks: []
		  });
		  return clone(schema, def);
		}
		function extend(schema, shape) {
		  if (!isPlainObject(shape)) {
		    throw new Error("Invalid input to extend: expected a plain object");
		  }
		  const checks = schema._zod.def.checks;
		  const hasChecks = checks && checks.length > 0;
		  if (hasChecks) {
		    const existingShape = schema._zod.def.shape;
		    for (const key in shape) {
		      if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) {
		        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
		      }
		    }
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const _shape = { ...schema._zod.def.shape, ...shape };
		      assignProp(this, "shape", _shape);
		      return _shape;
		    }
		  });
		  return clone(schema, def);
		}
		function safeExtend(schema, shape) {
		  if (!isPlainObject(shape)) {
		    throw new Error("Invalid input to safeExtend: expected a plain object");
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const _shape = { ...schema._zod.def.shape, ...shape };
		      assignProp(this, "shape", _shape);
		      return _shape;
		    }
		  });
		  return clone(schema, def);
		}
		function merge(a, b) {
		  if (a._zod.def.checks?.length) {
		    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
		  }
		  const def = mergeDefs(a._zod.def, {
		    get shape() {
		      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
		      assignProp(this, "shape", _shape);
		      return _shape;
		    },
		    get catchall() {
		      return b._zod.def.catchall;
		    },
		    checks: b._zod.def.checks ?? []
		  });
		  return clone(a, def);
		}
		function partial(Class2, schema, mask) {
		  const currDef = schema._zod.def;
		  const checks = currDef.checks;
		  const hasChecks = checks && checks.length > 0;
		  if (hasChecks) {
		    throw new Error(".partial() cannot be used on object schemas containing refinements");
		  }
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const oldShape = schema._zod.def.shape;
		      const shape = { ...oldShape };
		      if (mask) {
		        for (const key in mask) {
		          if (!(key in oldShape)) {
		            throw new Error(`Unrecognized key: "${key}"`);
		          }
		          if (!mask[key])
		            continue;
		          shape[key] = Class2 ? new Class2({
		            type: "optional",
		            innerType: oldShape[key]
		          }) : oldShape[key];
		        }
		      } else {
		        for (const key in oldShape) {
		          shape[key] = Class2 ? new Class2({
		            type: "optional",
		            innerType: oldShape[key]
		          }) : oldShape[key];
		        }
		      }
		      assignProp(this, "shape", shape);
		      return shape;
		    },
		    checks: []
		  });
		  return clone(schema, def);
		}
		function required(Class2, schema, mask) {
		  const def = mergeDefs(schema._zod.def, {
		    get shape() {
		      const oldShape = schema._zod.def.shape;
		      const shape = { ...oldShape };
		      if (mask) {
		        for (const key in mask) {
		          if (!(key in shape)) {
		            throw new Error(`Unrecognized key: "${key}"`);
		          }
		          if (!mask[key])
		            continue;
		          shape[key] = new Class2({
		            type: "nonoptional",
		            innerType: oldShape[key]
		          });
		        }
		      } else {
		        for (const key in oldShape) {
		          shape[key] = new Class2({
		            type: "nonoptional",
		            innerType: oldShape[key]
		          });
		        }
		      }
		      assignProp(this, "shape", shape);
		      return shape;
		    }
		  });
		  return clone(schema, def);
		}
		function aborted(x, startIndex = 0) {
		  if (x.aborted === true)
		    return true;
		  for (let i = startIndex; i < x.issues.length; i++) {
		    if (x.issues[i]?.continue !== true) {
		      return true;
		    }
		  }
		  return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
		  if (x.aborted === true)
		    return true;
		  for (let i = startIndex; i < x.issues.length; i++) {
		    if (x.issues[i]?.continue === false) {
		      return true;
		    }
		  }
		  return false;
		}
		function prefixIssues(path, issues) {
		  return issues.map((iss) => {
		    var _a3;
		    (_a3 = iss).path ?? (_a3.path = []);
		    iss.path.unshift(path);
		    return iss;
		  });
		}
		function unwrapMessage(message) {
		  return typeof message === "string" ? message : message?.message;
		}
		function finalizeIssue(iss, ctx, config2) {
		  const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
		  const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
		  rest.path ?? (rest.path = []);
		  rest.message = message;
		  if (ctx?.reportInput) {
		    rest.input = _input;
		  }
		  return rest;
		}
		function getSizableOrigin(input) {
		  if (input instanceof Set)
		    return "set";
		  if (input instanceof Map)
		    return "map";
		  if (input instanceof File)
		    return "file";
		  return "unknown";
		}
		function getLengthableOrigin(input) {
		  if (Array.isArray(input))
		    return "array";
		  if (typeof input === "string")
		    return "string";
		  return "unknown";
		}
		function parsedType(data) {
		  const t = typeof data;
		  switch (t) {
		    case "number": {
		      return Number.isNaN(data) ? "nan" : "number";
		    }
		    case "object": {
		      if (data === null) {
		        return "null";
		      }
		      if (Array.isArray(data)) {
		        return "array";
		      }
		      const obj = data;
		      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
		        return obj.constructor.name;
		      }
		    }
		  }
		  return t;
		}
		function issue(...args) {
		  const [iss, input, inst] = args;
		  if (typeof iss === "string") {
		    return {
		      message: iss,
		      code: "custom",
		      input,
		      inst
		    };
		  }
		  return { ...iss };
		}
		function cleanEnum(obj) {
		  return Object.entries(obj).filter(([k, _]) => {
		    return Number.isNaN(Number.parseInt(k, 10));
		  }).map((el) => el[1]);
		}
		function base64ToUint8Array(base643) {
		  const binaryString = atob(base643);
		  const bytes = new Uint8Array(binaryString.length);
		  for (let i = 0; i < binaryString.length; i++) {
		    bytes[i] = binaryString.charCodeAt(i);
		  }
		  return bytes;
		}
		function uint8ArrayToBase64(bytes) {
		  let binaryString = "";
		  for (let i = 0; i < bytes.length; i++) {
		    binaryString += String.fromCharCode(bytes[i]);
		  }
		  return btoa(binaryString);
		}
		function base64urlToUint8Array(base64url3) {
		  const base643 = base64url3.replace(/-/g, "+").replace(/_/g, "/");
		  const padding = "=".repeat((4 - base643.length % 4) % 4);
		  return base64ToUint8Array(base643 + padding);
		}
		function uint8ArrayToBase64url(bytes) {
		  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
		}
		function hexToUint8Array(hex3) {
		  const cleanHex = hex3.replace(/^0x/, "");
		  if (cleanHex.length % 2 !== 0) {
		    throw new Error("Invalid hex string length");
		  }
		  const bytes = new Uint8Array(cleanHex.length / 2);
		  for (let i = 0; i < cleanHex.length; i += 2) {
		    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
		  }
		  return bytes;
		}
		function uint8ArrayToHex(bytes) {
		  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
		}
		var Class = class {
		  constructor(..._args) {
		  }
		};

		// node_modules/zod/v4/core/errors.js
		var initializer = (inst, def) => {
		  inst.name = "$ZodError";
		  Object.defineProperty(inst, "_zod", {
		    value: inst._zod,
		    enumerable: false
		  });
		  Object.defineProperty(inst, "issues", {
		    value: def,
		    enumerable: false
		  });
		  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
		  Object.defineProperty(inst, "toString", {
		    value: () => inst.message,
		    enumerable: false
		  });
		};
		var $ZodError = $constructor("$ZodError", initializer);
		var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
		function flattenError(error51, mapper = (issue2) => issue2.message) {
		  const fieldErrors = {};
		  const formErrors = [];
		  for (const sub of error51.issues) {
		    if (sub.path.length > 0) {
		      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		      fieldErrors[sub.path[0]].push(mapper(sub));
		    } else {
		      formErrors.push(mapper(sub));
		    }
		  }
		  return { formErrors, fieldErrors };
		}
		function formatError(error51, mapper = (issue2) => issue2.message) {
		  const fieldErrors = { _errors: [] };
		  const processError = (error52, path = []) => {
		    for (const issue2 of error52.issues) {
		      if (issue2.code === "invalid_union" && issue2.errors.length) {
		        issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
		      } else if (issue2.code === "invalid_key") {
		        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
		      } else if (issue2.code === "invalid_element") {
		        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
		      } else {
		        const fullpath = [...path, ...issue2.path];
		        if (fullpath.length === 0) {
		          fieldErrors._errors.push(mapper(issue2));
		        } else {
		          let curr = fieldErrors;
		          let i = 0;
		          while (i < fullpath.length) {
		            const el = fullpath[i];
		            const terminal = i === fullpath.length - 1;
		            if (!terminal) {
		              curr[el] = curr[el] || { _errors: [] };
		            } else {
		              curr[el] = curr[el] || { _errors: [] };
		              curr[el]._errors.push(mapper(issue2));
		            }
		            curr = curr[el];
		            i++;
		          }
		        }
		      }
		    }
		  };
		  processError(error51);
		  return fieldErrors;
		}
		function treeifyError(error51, mapper = (issue2) => issue2.message) {
		  const result = { errors: [] };
		  const processError = (error52, path = []) => {
		    var _a3, _b;
		    for (const issue2 of error52.issues) {
		      if (issue2.code === "invalid_union" && issue2.errors.length) {
		        issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
		      } else if (issue2.code === "invalid_key") {
		        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
		      } else if (issue2.code === "invalid_element") {
		        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
		      } else {
		        const fullpath = [...path, ...issue2.path];
		        if (fullpath.length === 0) {
		          result.errors.push(mapper(issue2));
		          continue;
		        }
		        let curr = result;
		        let i = 0;
		        while (i < fullpath.length) {
		          const el = fullpath[i];
		          const terminal = i === fullpath.length - 1;
		          if (typeof el === "string") {
		            curr.properties ?? (curr.properties = {});
		            (_a3 = curr.properties)[el] ?? (_a3[el] = { errors: [] });
		            curr = curr.properties[el];
		          } else {
		            curr.items ?? (curr.items = []);
		            (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
		            curr = curr.items[el];
		          }
		          if (terminal) {
		            curr.errors.push(mapper(issue2));
		          }
		          i++;
		        }
		      }
		    }
		  };
		  processError(error51);
		  return result;
		}
		function toDotPath(_path) {
		  const segs = [];
		  const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
		  for (const seg of path) {
		    if (typeof seg === "number")
		      segs.push(`[${seg}]`);
		    else if (typeof seg === "symbol")
		      segs.push(`[${JSON.stringify(String(seg))}]`);
		    else if (/[^\w$]/.test(seg))
		      segs.push(`[${JSON.stringify(seg)}]`);
		    else {
		      if (segs.length)
		        segs.push(".");
		      segs.push(seg);
		    }
		  }
		  return segs.join("");
		}
		function prettifyError(error51) {
		  const lines = [];
		  const issues = [...error51.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
		  for (const issue2 of issues) {
		    lines.push(`\u2716 ${issue2.message}`);
		    if (issue2.path?.length)
		      lines.push(`  \u2192 at ${toDotPath(issue2.path)}`);
		  }
		  return lines.join("\n");
		}

		// node_modules/zod/v4/core/parse.js
		var _parse = (_Err) => (schema, value, _ctx, _params) => {
		  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
		  const result = schema._zod.run({ value, issues: [] }, ctx);
		  if (result instanceof Promise) {
		    throw new $ZodAsyncError();
		  }
		  if (result.issues.length) {
		    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		    captureStackTrace(e, _params?.callee);
		    throw e;
		  }
		  return result.value;
		};
		var parse = /* @__PURE__ */ _parse($ZodRealError);
		var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
		  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
		  let result = schema._zod.run({ value, issues: [] }, ctx);
		  if (result instanceof Promise)
		    result = await result;
		  if (result.issues.length) {
		    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		    captureStackTrace(e, params?.callee);
		    throw e;
		  }
		  return result.value;
		};
		var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
		var _safeParse = (_Err) => (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
		  const result = schema._zod.run({ value, issues: [] }, ctx);
		  if (result instanceof Promise) {
		    throw new $ZodAsyncError();
		  }
		  return result.issues.length ? {
		    success: false,
		    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
		  } : { success: true, data: result.value };
		};
		var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
		var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
		  let result = schema._zod.run({ value, issues: [] }, ctx);
		  if (result instanceof Promise)
		    result = await result;
		  return result.issues.length ? {
		    success: false,
		    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
		  } : { success: true, data: result.value };
		};
		var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
		var _encode = (_Err) => (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		  return _parse(_Err)(schema, value, ctx);
		};
		var encode = /* @__PURE__ */ _encode($ZodRealError);
		var _decode = (_Err) => (schema, value, _ctx) => {
		  return _parse(_Err)(schema, value, _ctx);
		};
		var decode = /* @__PURE__ */ _decode($ZodRealError);
		var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		  return _parseAsync(_Err)(schema, value, ctx);
		};
		var encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
		var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
		  return _parseAsync(_Err)(schema, value, _ctx);
		};
		var decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
		var _safeEncode = (_Err) => (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		  return _safeParse(_Err)(schema, value, ctx);
		};
		var safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
		var _safeDecode = (_Err) => (schema, value, _ctx) => {
		  return _safeParse(_Err)(schema, value, _ctx);
		};
		var safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
		var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
		  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		  return _safeParseAsync(_Err)(schema, value, ctx);
		};
		var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
		var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
		  return _safeParseAsync(_Err)(schema, value, _ctx);
		};
		var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);

		// node_modules/zod/v4/core/regexes.js
		var regexes_exports = {};
		__export(regexes_exports, {
		  base64: () => base64,
		  base64url: () => base64url,
		  bigint: () => bigint,
		  boolean: () => boolean,
		  browserEmail: () => browserEmail,
		  cidrv4: () => cidrv4,
		  cidrv6: () => cidrv6,
		  cuid: () => cuid,
		  cuid2: () => cuid2,
		  date: () => date,
		  datetime: () => datetime,
		  domain: () => domain,
		  duration: () => duration,
		  e164: () => e164,
		  email: () => email,
		  emoji: () => emoji,
		  extendedDuration: () => extendedDuration,
		  guid: () => guid,
		  hex: () => hex,
		  hostname: () => hostname,
		  html5Email: () => html5Email,
		  httpProtocol: () => httpProtocol,
		  idnEmail: () => idnEmail,
		  integer: () => integer,
		  ipv4: () => ipv4,
		  ipv6: () => ipv6,
		  ksuid: () => ksuid,
		  lowercase: () => lowercase,
		  mac: () => mac,
		  md5_base64: () => md5_base64,
		  md5_base64url: () => md5_base64url,
		  md5_hex: () => md5_hex,
		  nanoid: () => nanoid,
		  null: () => _null,
		  number: () => number,
		  rfc5322Email: () => rfc5322Email,
		  sha1_base64: () => sha1_base64,
		  sha1_base64url: () => sha1_base64url,
		  sha1_hex: () => sha1_hex,
		  sha256_base64: () => sha256_base64,
		  sha256_base64url: () => sha256_base64url,
		  sha256_hex: () => sha256_hex,
		  sha384_base64: () => sha384_base64,
		  sha384_base64url: () => sha384_base64url,
		  sha384_hex: () => sha384_hex,
		  sha512_base64: () => sha512_base64,
		  sha512_base64url: () => sha512_base64url,
		  sha512_hex: () => sha512_hex,
		  string: () => string,
		  time: () => time,
		  ulid: () => ulid,
		  undefined: () => _undefined,
		  unicodeEmail: () => unicodeEmail,
		  uppercase: () => uppercase,
		  uuid: () => uuid,
		  uuid4: () => uuid4,
		  uuid6: () => uuid6,
		  uuid7: () => uuid7,
		  xid: () => xid
		});
		var cuid = /^[cC][0-9a-z]{6,}$/;
		var cuid2 = /^[0-9a-z]+$/;
		var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
		var xid = /^[0-9a-vA-V]{20}$/;
		var ksuid = /^[A-Za-z0-9]{27}$/;
		var nanoid = /^[a-zA-Z0-9_-]{21}$/;
		var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
		var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		var uuid = (version2) => {
		  if (!version2)
		    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
		  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		var uuid4 = /* @__PURE__ */ uuid(4);
		var uuid6 = /* @__PURE__ */ uuid(6);
		var uuid7 = /* @__PURE__ */ uuid(7);
		var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
		var idnEmail = unicodeEmail;
		var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		function emoji() {
		  return new RegExp(_emoji, "u");
		}
		var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		var mac = (delimiter) => {
		  const escapedDelim = escapeRegex(delimiter ?? ":");
		  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
		};
		var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		var base64url = /^[A-Za-z0-9_-]*$/;
		var hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
		var domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
		var httpProtocol = /^https?$/;
		var e164 = /^\+[1-9]\d{6,14}$/;
		var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
		function timeSource(args) {
		  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
		  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		  return regex;
		}
		function time(args) {
		  return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime(args) {
		  const time3 = timeSource({ precision: args.precision });
		  const opts = ["Z"];
		  if (args.local)
		    opts.push("");
		  if (args.offset)
		    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
		  const timeRegex = `${time3}(?:${opts.join("|")})`;
		  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		var string = (params) => {
		  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
		  return new RegExp(`^${regex}$`);
		};
		var bigint = /^-?\d+n?$/;
		var integer = /^-?\d+$/;
		var number = /^-?\d+(?:\.\d+)?$/;
		var boolean = /^(?:true|false)$/i;
		var _null = /^null$/i;
		var _undefined = /^undefined$/i;
		var lowercase = /^[^A-Z]*$/;
		var uppercase = /^[^a-z]*$/;
		var hex = /^[0-9a-fA-F]*$/;
		function fixedBase64(bodyLength, padding) {
		  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
		}
		function fixedBase64url(length) {
		  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
		}
		var md5_hex = /^[0-9a-fA-F]{32}$/;
		var md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
		var md5_base64url = /* @__PURE__ */ fixedBase64url(22);
		var sha1_hex = /^[0-9a-fA-F]{40}$/;
		var sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
		var sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
		var sha256_hex = /^[0-9a-fA-F]{64}$/;
		var sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
		var sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
		var sha384_hex = /^[0-9a-fA-F]{96}$/;
		var sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
		var sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
		var sha512_hex = /^[0-9a-fA-F]{128}$/;
		var sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
		var sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

		// node_modules/zod/v4/core/checks.js
		var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
		  var _a3;
		  inst._zod ?? (inst._zod = {});
		  inst._zod.def = def;
		  (_a3 = inst._zod).onattach ?? (_a3.onattach = []);
		});
		var numericOriginMap = {
		  number: "number",
		  bigint: "bigint",
		  object: "date"
		};
		var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const origin = numericOriginMap[typeof def.value];
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
		    if (def.value < curr) {
		      if (def.inclusive)
		        bag.maximum = def.value;
		      else
		        bag.exclusiveMaximum = def.value;
		    }
		  });
		  inst._zod.check = (payload) => {
		    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
		      return;
		    }
		    payload.issues.push({
		      origin,
		      code: "too_big",
		      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
		      input: payload.value,
		      inclusive: def.inclusive,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const origin = numericOriginMap[typeof def.value];
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
		    if (def.value > curr) {
		      if (def.inclusive)
		        bag.minimum = def.value;
		      else
		        bag.exclusiveMinimum = def.value;
		    }
		  });
		  inst._zod.check = (payload) => {
		    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
		      return;
		    }
		    payload.issues.push({
		      origin,
		      code: "too_small",
		      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
		      input: payload.value,
		      inclusive: def.inclusive,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  inst._zod.onattach.push((inst2) => {
		    var _a3;
		    (_a3 = inst2._zod.bag).multipleOf ?? (_a3.multipleOf = def.value);
		  });
		  inst._zod.check = (payload) => {
		    if (typeof payload.value !== typeof def.value)
		      throw new Error("Cannot mix number and bigint in multiple_of check.");
		    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
		    if (isMultiple)
		      return;
		    payload.issues.push({
		      origin: typeof payload.value,
		      code: "not_multiple_of",
		      divisor: def.value,
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  def.format = def.format || "float64";
		  const isInt = def.format?.includes("int");
		  const origin = isInt ? "int" : "number";
		  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.format = def.format;
		    bag.minimum = minimum;
		    bag.maximum = maximum;
		    if (isInt)
		      bag.pattern = integer;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    if (isInt) {
		      if (!Number.isInteger(input)) {
		        payload.issues.push({
		          expected: origin,
		          format: def.format,
		          code: "invalid_type",
		          continue: false,
		          input,
		          inst
		        });
		        return;
		      }
		      if (!Number.isSafeInteger(input)) {
		        if (input > 0) {
		          payload.issues.push({
		            input,
		            code: "too_big",
		            maximum: Number.MAX_SAFE_INTEGER,
		            note: "Integers must be within the safe integer range.",
		            inst,
		            origin,
		            inclusive: true,
		            continue: !def.abort
		          });
		        } else {
		          payload.issues.push({
		            input,
		            code: "too_small",
		            minimum: Number.MIN_SAFE_INTEGER,
		            note: "Integers must be within the safe integer range.",
		            inst,
		            origin,
		            inclusive: true,
		            continue: !def.abort
		          });
		        }
		        return;
		      }
		    }
		    if (input < minimum) {
		      payload.issues.push({
		        origin: "number",
		        input,
		        code: "too_small",
		        minimum,
		        inclusive: true,
		        inst,
		        continue: !def.abort
		      });
		    }
		    if (input > maximum) {
		      payload.issues.push({
		        origin: "number",
		        input,
		        code: "too_big",
		        maximum,
		        inclusive: true,
		        inst,
		        continue: !def.abort
		      });
		    }
		  };
		});
		var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.format = def.format;
		    bag.minimum = minimum;
		    bag.maximum = maximum;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    if (input < minimum) {
		      payload.issues.push({
		        origin: "bigint",
		        input,
		        code: "too_small",
		        minimum,
		        inclusive: true,
		        inst,
		        continue: !def.abort
		      });
		    }
		    if (input > maximum) {
		      payload.issues.push({
		        origin: "bigint",
		        input,
		        code: "too_big",
		        maximum,
		        inclusive: true,
		        inst,
		        continue: !def.abort
		      });
		    }
		  };
		});
		var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
		  var _a3;
		  $ZodCheck.init(inst, def);
		  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
		    const val = payload.value;
		    return !nullish(val) && val.size !== void 0;
		  });
		  inst._zod.onattach.push((inst2) => {
		    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		    if (def.maximum < curr)
		      inst2._zod.bag.maximum = def.maximum;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const size = input.size;
		    if (size <= def.maximum)
		      return;
		    payload.issues.push({
		      origin: getSizableOrigin(input),
		      code: "too_big",
		      maximum: def.maximum,
		      inclusive: true,
		      input,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
		  var _a3;
		  $ZodCheck.init(inst, def);
		  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
		    const val = payload.value;
		    return !nullish(val) && val.size !== void 0;
		  });
		  inst._zod.onattach.push((inst2) => {
		    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		    if (def.minimum > curr)
		      inst2._zod.bag.minimum = def.minimum;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const size = input.size;
		    if (size >= def.minimum)
		      return;
		    payload.issues.push({
		      origin: getSizableOrigin(input),
		      code: "too_small",
		      minimum: def.minimum,
		      inclusive: true,
		      input,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
		  var _a3;
		  $ZodCheck.init(inst, def);
		  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
		    const val = payload.value;
		    return !nullish(val) && val.size !== void 0;
		  });
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.minimum = def.size;
		    bag.maximum = def.size;
		    bag.size = def.size;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const size = input.size;
		    if (size === def.size)
		      return;
		    const tooBig = size > def.size;
		    payload.issues.push({
		      origin: getSizableOrigin(input),
		      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
		      inclusive: true,
		      exact: true,
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
		  var _a3;
		  $ZodCheck.init(inst, def);
		  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
		    const val = payload.value;
		    return !nullish(val) && val.length !== void 0;
		  });
		  inst._zod.onattach.push((inst2) => {
		    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		    if (def.maximum < curr)
		      inst2._zod.bag.maximum = def.maximum;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const length = input.length;
		    if (length <= def.maximum)
		      return;
		    const origin = getLengthableOrigin(input);
		    payload.issues.push({
		      origin,
		      code: "too_big",
		      maximum: def.maximum,
		      inclusive: true,
		      input,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
		  var _a3;
		  $ZodCheck.init(inst, def);
		  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
		    const val = payload.value;
		    return !nullish(val) && val.length !== void 0;
		  });
		  inst._zod.onattach.push((inst2) => {
		    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		    if (def.minimum > curr)
		      inst2._zod.bag.minimum = def.minimum;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const length = input.length;
		    if (length >= def.minimum)
		      return;
		    const origin = getLengthableOrigin(input);
		    payload.issues.push({
		      origin,
		      code: "too_small",
		      minimum: def.minimum,
		      inclusive: true,
		      input,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
		  var _a3;
		  $ZodCheck.init(inst, def);
		  (_a3 = inst._zod.def).when ?? (_a3.when = (payload) => {
		    const val = payload.value;
		    return !nullish(val) && val.length !== void 0;
		  });
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.minimum = def.length;
		    bag.maximum = def.length;
		    bag.length = def.length;
		  });
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const length = input.length;
		    if (length === def.length)
		      return;
		    const origin = getLengthableOrigin(input);
		    const tooBig = length > def.length;
		    payload.issues.push({
		      origin,
		      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
		      inclusive: true,
		      exact: true,
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
		  var _a3, _b;
		  $ZodCheck.init(inst, def);
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.format = def.format;
		    if (def.pattern) {
		      bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		      bag.patterns.add(def.pattern);
		    }
		  });
		  if (def.pattern)
		    (_a3 = inst._zod).check ?? (_a3.check = (payload) => {
		      def.pattern.lastIndex = 0;
		      if (def.pattern.test(payload.value))
		        return;
		      payload.issues.push({
		        origin: "string",
		        code: "invalid_format",
		        format: def.format,
		        input: payload.value,
		        ...def.pattern ? { pattern: def.pattern.toString() } : {},
		        inst,
		        continue: !def.abort
		      });
		    });
		  else
		    (_b = inst._zod).check ?? (_b.check = () => {
		    });
		});
		var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
		  $ZodCheckStringFormat.init(inst, def);
		  inst._zod.check = (payload) => {
		    def.pattern.lastIndex = 0;
		    if (def.pattern.test(payload.value))
		      return;
		    payload.issues.push({
		      origin: "string",
		      code: "invalid_format",
		      format: "regex",
		      input: payload.value,
		      pattern: def.pattern.toString(),
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
		  def.pattern ?? (def.pattern = lowercase);
		  $ZodCheckStringFormat.init(inst, def);
		});
		var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
		  def.pattern ?? (def.pattern = uppercase);
		  $ZodCheckStringFormat.init(inst, def);
		});
		var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const escapedRegex = escapeRegex(def.includes);
		  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
		  def.pattern = pattern;
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		    bag.patterns.add(pattern);
		  });
		  inst._zod.check = (payload) => {
		    if (payload.value.includes(def.includes, def.position))
		      return;
		    payload.issues.push({
		      origin: "string",
		      code: "invalid_format",
		      format: "includes",
		      includes: def.includes,
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
		  def.pattern ?? (def.pattern = pattern);
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		    bag.patterns.add(pattern);
		  });
		  inst._zod.check = (payload) => {
		    if (payload.value.startsWith(def.prefix))
		      return;
		    payload.issues.push({
		      origin: "string",
		      code: "invalid_format",
		      format: "starts_with",
		      prefix: def.prefix,
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
		  def.pattern ?? (def.pattern = pattern);
		  inst._zod.onattach.push((inst2) => {
		    const bag = inst2._zod.bag;
		    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		    bag.patterns.add(pattern);
		  });
		  inst._zod.check = (payload) => {
		    if (payload.value.endsWith(def.suffix))
		      return;
		    payload.issues.push({
		      origin: "string",
		      code: "invalid_format",
		      format: "ends_with",
		      suffix: def.suffix,
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		function handleCheckPropertyResult(result, payload, property) {
		  if (result.issues.length) {
		    payload.issues.push(...prefixIssues(property, result.issues));
		  }
		}
		var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  inst._zod.check = (payload) => {
		    const result = def.schema._zod.run({
		      value: payload.value[def.property],
		      issues: []
		    }, {});
		    if (result instanceof Promise) {
		      return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
		    }
		    handleCheckPropertyResult(result, payload, def.property);
		    return;
		  };
		});
		var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  const mimeSet = new Set(def.mime);
		  inst._zod.onattach.push((inst2) => {
		    inst2._zod.bag.mime = def.mime;
		  });
		  inst._zod.check = (payload) => {
		    if (mimeSet.has(payload.value.type))
		      return;
		    payload.issues.push({
		      code: "invalid_value",
		      values: def.mime,
		      input: payload.value.type,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  inst._zod.check = (payload) => {
		    payload.value = def.tx(payload.value);
		  };
		});

		// node_modules/zod/v4/core/doc.js
		var Doc = class {
		  constructor(args = []) {
		    this.content = [];
		    this.indent = 0;
		    if (this)
		      this.args = args;
		  }
		  indented(fn) {
		    this.indent += 1;
		    fn(this);
		    this.indent -= 1;
		  }
		  write(arg) {
		    if (typeof arg === "function") {
		      arg(this, { execution: "sync" });
		      arg(this, { execution: "async" });
		      return;
		    }
		    const content = arg;
		    const lines = content.split("\n").filter((x) => x);
		    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		    for (const line of dedented) {
		      this.content.push(line);
		    }
		  }
		  compile() {
		    const F = Function;
		    const args = this?.args;
		    const content = this?.content ?? [``];
		    const lines = [...content.map((x) => `  ${x}`)];
		    return new F(...args, lines.join("\n"));
		  }
		};

		// node_modules/zod/v4/core/versions.js
		var version = {
		  major: 4,
		  minor: 4,
		  patch: 3
		};

		// node_modules/zod/v4/core/schemas.js
		var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
		  var _a3;
		  inst ?? (inst = {});
		  inst._zod.def = def;
		  inst._zod.bag = inst._zod.bag || {};
		  inst._zod.version = version;
		  const checks = [...inst._zod.def.checks ?? []];
		  if (inst._zod.traits.has("$ZodCheck")) {
		    checks.unshift(inst);
		  }
		  for (const ch of checks) {
		    for (const fn of ch._zod.onattach) {
		      fn(inst);
		    }
		  }
		  if (checks.length === 0) {
		    (_a3 = inst._zod).deferred ?? (_a3.deferred = []);
		    inst._zod.deferred?.push(() => {
		      inst._zod.run = inst._zod.parse;
		    });
		  } else {
		    const runChecks = (payload, checks2, ctx) => {
		      let isAborted = aborted(payload);
		      let asyncResult;
		      for (const ch of checks2) {
		        if (ch._zod.def.when) {
		          if (explicitlyAborted(payload))
		            continue;
		          const shouldRun = ch._zod.def.when(payload);
		          if (!shouldRun)
		            continue;
		        } else if (isAborted) {
		          continue;
		        }
		        const currLen = payload.issues.length;
		        const _ = ch._zod.check(payload);
		        if (_ instanceof Promise && ctx?.async === false) {
		          throw new $ZodAsyncError();
		        }
		        if (asyncResult || _ instanceof Promise) {
		          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
		            await _;
		            const nextLen = payload.issues.length;
		            if (nextLen === currLen)
		              return;
		            if (!isAborted)
		              isAborted = aborted(payload, currLen);
		          });
		        } else {
		          const nextLen = payload.issues.length;
		          if (nextLen === currLen)
		            continue;
		          if (!isAborted)
		            isAborted = aborted(payload, currLen);
		        }
		      }
		      if (asyncResult) {
		        return asyncResult.then(() => {
		          return payload;
		        });
		      }
		      return payload;
		    };
		    const handleCanaryResult = (canary, payload, ctx) => {
		      if (aborted(canary)) {
		        canary.aborted = true;
		        return canary;
		      }
		      const checkResult = runChecks(payload, checks, ctx);
		      if (checkResult instanceof Promise) {
		        if (ctx.async === false)
		          throw new $ZodAsyncError();
		        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
		      }
		      return inst._zod.parse(checkResult, ctx);
		    };
		    inst._zod.run = (payload, ctx) => {
		      if (ctx.skipChecks) {
		        return inst._zod.parse(payload, ctx);
		      }
		      if (ctx.direction === "backward") {
		        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
		        if (canary instanceof Promise) {
		          return canary.then((canary2) => {
		            return handleCanaryResult(canary2, payload, ctx);
		          });
		        }
		        return handleCanaryResult(canary, payload, ctx);
		      }
		      const result = inst._zod.parse(payload, ctx);
		      if (result instanceof Promise) {
		        if (ctx.async === false)
		          throw new $ZodAsyncError();
		        return result.then((result2) => runChecks(result2, checks, ctx));
		      }
		      return runChecks(result, checks, ctx);
		    };
		  }
		  defineLazy(inst, "~standard", () => ({
		    validate: (value) => {
		      try {
		        const r = safeParse(inst, value);
		        return r.success ? { value: r.data } : { issues: r.error?.issues };
		      } catch (_) {
		        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
		      }
		    },
		    vendor: "zod",
		    version: 1
		  }));
		});
		var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
		  inst._zod.parse = (payload, _) => {
		    if (def.coerce)
		      try {
		        payload.value = String(payload.value);
		      } catch (_2) {
		      }
		    if (typeof payload.value === "string")
		      return payload;
		    payload.issues.push({
		      expected: "string",
		      code: "invalid_type",
		      input: payload.value,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
		  $ZodCheckStringFormat.init(inst, def);
		  $ZodString.init(inst, def);
		});
		var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
		  def.pattern ?? (def.pattern = guid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
		  if (def.version) {
		    const versionMap = {
		      v1: 1,
		      v2: 2,
		      v3: 3,
		      v4: 4,
		      v5: 5,
		      v6: 6,
		      v7: 7,
		      v8: 8
		    };
		    const v = versionMap[def.version];
		    if (v === void 0)
		      throw new Error(`Invalid UUID version: "${def.version}"`);
		    def.pattern ?? (def.pattern = uuid(v));
		  } else
		    def.pattern ?? (def.pattern = uuid());
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
		  def.pattern ?? (def.pattern = email);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
		  $ZodStringFormat.init(inst, def);
		  inst._zod.check = (payload) => {
		    try {
		      const trimmed = payload.value.trim();
		      if (!def.normalize && def.protocol?.source === httpProtocol.source) {
		        if (!/^https?:\/\//i.test(trimmed)) {
		          payload.issues.push({
		            code: "invalid_format",
		            format: "url",
		            note: "Invalid URL format",
		            input: payload.value,
		            inst,
		            continue: !def.abort
		          });
		          return;
		        }
		      }
		      const url2 = new URL(trimmed);
		      if (def.hostname) {
		        def.hostname.lastIndex = 0;
		        if (!def.hostname.test(url2.hostname)) {
		          payload.issues.push({
		            code: "invalid_format",
		            format: "url",
		            note: "Invalid hostname",
		            pattern: def.hostname.source,
		            input: payload.value,
		            inst,
		            continue: !def.abort
		          });
		        }
		      }
		      if (def.protocol) {
		        def.protocol.lastIndex = 0;
		        if (!def.protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol)) {
		          payload.issues.push({
		            code: "invalid_format",
		            format: "url",
		            note: "Invalid protocol",
		            pattern: def.protocol.source,
		            input: payload.value,
		            inst,
		            continue: !def.abort
		          });
		        }
		      }
		      if (def.normalize) {
		        payload.value = url2.href;
		      } else {
		        payload.value = trimmed;
		      }
		      return;
		    } catch (_) {
		      payload.issues.push({
		        code: "invalid_format",
		        format: "url",
		        input: payload.value,
		        inst,
		        continue: !def.abort
		      });
		    }
		  };
		});
		var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
		  def.pattern ?? (def.pattern = emoji());
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
		  def.pattern ?? (def.pattern = nanoid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
		  def.pattern ?? (def.pattern = cuid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
		  def.pattern ?? (def.pattern = cuid2);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
		  def.pattern ?? (def.pattern = ulid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
		  def.pattern ?? (def.pattern = xid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
		  def.pattern ?? (def.pattern = ksuid);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
		  def.pattern ?? (def.pattern = datetime(def));
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
		  def.pattern ?? (def.pattern = date);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
		  def.pattern ?? (def.pattern = time(def));
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
		  def.pattern ?? (def.pattern = duration);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
		  def.pattern ?? (def.pattern = ipv4);
		  $ZodStringFormat.init(inst, def);
		  inst._zod.bag.format = `ipv4`;
		});
		var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
		  def.pattern ?? (def.pattern = ipv6);
		  $ZodStringFormat.init(inst, def);
		  inst._zod.bag.format = `ipv6`;
		  inst._zod.check = (payload) => {
		    try {
		      new URL(`http://[${payload.value}]`);
		    } catch {
		      payload.issues.push({
		        code: "invalid_format",
		        format: "ipv6",
		        input: payload.value,
		        inst,
		        continue: !def.abort
		      });
		    }
		  };
		});
		var $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
		  def.pattern ?? (def.pattern = mac(def.delimiter));
		  $ZodStringFormat.init(inst, def);
		  inst._zod.bag.format = `mac`;
		});
		var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
		  def.pattern ?? (def.pattern = cidrv4);
		  $ZodStringFormat.init(inst, def);
		});
		var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
		  def.pattern ?? (def.pattern = cidrv6);
		  $ZodStringFormat.init(inst, def);
		  inst._zod.check = (payload) => {
		    const parts = payload.value.split("/");
		    try {
		      if (parts.length !== 2)
		        throw new Error();
		      const [address, prefix] = parts;
		      if (!prefix)
		        throw new Error();
		      const prefixNum = Number(prefix);
		      if (`${prefixNum}` !== prefix)
		        throw new Error();
		      if (prefixNum < 0 || prefixNum > 128)
		        throw new Error();
		      new URL(`http://[${address}]`);
		    } catch {
		      payload.issues.push({
		        code: "invalid_format",
		        format: "cidrv6",
		        input: payload.value,
		        inst,
		        continue: !def.abort
		      });
		    }
		  };
		});
		function isValidBase64(data) {
		  if (data === "")
		    return true;
		  if (/\s/.test(data))
		    return false;
		  if (data.length % 4 !== 0)
		    return false;
		  try {
		    atob(data);
		    return true;
		  } catch {
		    return false;
		  }
		}
		var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
		  def.pattern ?? (def.pattern = base64);
		  $ZodStringFormat.init(inst, def);
		  inst._zod.bag.contentEncoding = "base64";
		  inst._zod.check = (payload) => {
		    if (isValidBase64(payload.value))
		      return;
		    payload.issues.push({
		      code: "invalid_format",
		      format: "base64",
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		function isValidBase64URL(data) {
		  if (!base64url.test(data))
		    return false;
		  const base643 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
		  const padded = base643.padEnd(Math.ceil(base643.length / 4) * 4, "=");
		  return isValidBase64(padded);
		}
		var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
		  def.pattern ?? (def.pattern = base64url);
		  $ZodStringFormat.init(inst, def);
		  inst._zod.bag.contentEncoding = "base64url";
		  inst._zod.check = (payload) => {
		    if (isValidBase64URL(payload.value))
		      return;
		    payload.issues.push({
		      code: "invalid_format",
		      format: "base64url",
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
		  def.pattern ?? (def.pattern = e164);
		  $ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
		  try {
		    const tokensParts = token.split(".");
		    if (tokensParts.length !== 3)
		      return false;
		    const [header] = tokensParts;
		    if (!header)
		      return false;
		    const parsedHeader = JSON.parse(atob(header));
		    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
		      return false;
		    if (!parsedHeader.alg)
		      return false;
		    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
		      return false;
		    return true;
		  } catch {
		    return false;
		  }
		}
		var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
		  $ZodStringFormat.init(inst, def);
		  inst._zod.check = (payload) => {
		    if (isValidJWT(payload.value, def.alg))
		      return;
		    payload.issues.push({
		      code: "invalid_format",
		      format: "jwt",
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
		  $ZodStringFormat.init(inst, def);
		  inst._zod.check = (payload) => {
		    if (def.fn(payload.value))
		      return;
		    payload.issues.push({
		      code: "invalid_format",
		      format: def.format,
		      input: payload.value,
		      inst,
		      continue: !def.abort
		    });
		  };
		});
		var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.pattern = inst._zod.bag.pattern ?? number;
		  inst._zod.parse = (payload, _ctx) => {
		    if (def.coerce)
		      try {
		        payload.value = Number(payload.value);
		      } catch (_) {
		      }
		    const input = payload.value;
		    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
		      return payload;
		    }
		    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
		    payload.issues.push({
		      expected: "number",
		      code: "invalid_type",
		      input,
		      inst,
		      ...received ? { received } : {}
		    });
		    return payload;
		  };
		});
		var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
		  $ZodCheckNumberFormat.init(inst, def);
		  $ZodNumber.init(inst, def);
		});
		var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.pattern = boolean;
		  inst._zod.parse = (payload, _ctx) => {
		    if (def.coerce)
		      try {
		        payload.value = Boolean(payload.value);
		      } catch (_) {
		      }
		    const input = payload.value;
		    if (typeof input === "boolean")
		      return payload;
		    payload.issues.push({
		      expected: "boolean",
		      code: "invalid_type",
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.pattern = bigint;
		  inst._zod.parse = (payload, _ctx) => {
		    if (def.coerce)
		      try {
		        payload.value = BigInt(payload.value);
		      } catch (_) {
		      }
		    if (typeof payload.value === "bigint")
		      return payload;
		    payload.issues.push({
		      expected: "bigint",
		      code: "invalid_type",
		      input: payload.value,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
		  $ZodCheckBigIntFormat.init(inst, def);
		  $ZodBigInt.init(inst, def);
		});
		var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, _ctx) => {
		    const input = payload.value;
		    if (typeof input === "symbol")
		      return payload;
		    payload.issues.push({
		      expected: "symbol",
		      code: "invalid_type",
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.pattern = _undefined;
		  inst._zod.values = /* @__PURE__ */ new Set([void 0]);
		  inst._zod.parse = (payload, _ctx) => {
		    const input = payload.value;
		    if (typeof input === "undefined")
		      return payload;
		    payload.issues.push({
		      expected: "undefined",
		      code: "invalid_type",
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.pattern = _null;
		  inst._zod.values = /* @__PURE__ */ new Set([null]);
		  inst._zod.parse = (payload, _ctx) => {
		    const input = payload.value;
		    if (input === null)
		      return payload;
		    payload.issues.push({
		      expected: "null",
		      code: "invalid_type",
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload) => payload;
		});
		var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload) => payload;
		});
		var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, _ctx) => {
		    payload.issues.push({
		      expected: "never",
		      code: "invalid_type",
		      input: payload.value,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, _ctx) => {
		    const input = payload.value;
		    if (typeof input === "undefined")
		      return payload;
		    payload.issues.push({
		      expected: "void",
		      code: "invalid_type",
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, _ctx) => {
		    if (def.coerce) {
		      try {
		        payload.value = new Date(payload.value);
		      } catch (_err) {
		      }
		    }
		    const input = payload.value;
		    const isDate = input instanceof Date;
		    const isValidDate = isDate && !Number.isNaN(input.getTime());
		    if (isValidDate)
		      return payload;
		    payload.issues.push({
		      expected: "date",
		      code: "invalid_type",
		      input,
		      ...isDate ? { received: "Invalid Date" } : {},
		      inst
		    });
		    return payload;
		  };
		});
		function handleArrayResult(result, final, index) {
		  if (result.issues.length) {
		    final.issues.push(...prefixIssues(index, result.issues));
		  }
		  final.value[index] = result.value;
		}
		var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, ctx) => {
		    const input = payload.value;
		    if (!Array.isArray(input)) {
		      payload.issues.push({
		        expected: "array",
		        code: "invalid_type",
		        input,
		        inst
		      });
		      return payload;
		    }
		    payload.value = Array(input.length);
		    const proms = [];
		    for (let i = 0; i < input.length; i++) {
		      const item = input[i];
		      const result = def.element._zod.run({
		        value: item,
		        issues: []
		      }, ctx);
		      if (result instanceof Promise) {
		        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
		      } else {
		        handleArrayResult(result, payload, i);
		      }
		    }
		    if (proms.length) {
		      return Promise.all(proms).then(() => payload);
		    }
		    return payload;
		  };
		});
		function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
		  const isPresent = key in input;
		  if (result.issues.length) {
		    if (isOptionalIn && isOptionalOut && !isPresent) {
		      return;
		    }
		    final.issues.push(...prefixIssues(key, result.issues));
		  }
		  if (!isPresent && !isOptionalIn) {
		    if (!result.issues.length) {
		      final.issues.push({
		        code: "invalid_type",
		        expected: "nonoptional",
		        input: void 0,
		        path: [key]
		      });
		    }
		    return;
		  }
		  if (result.value === void 0) {
		    if (isPresent) {
		      final.value[key] = void 0;
		    }
		  } else {
		    final.value[key] = result.value;
		  }
		}
		function normalizeDef(def) {
		  const keys = Object.keys(def.shape);
		  for (const k of keys) {
		    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
		      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
		    }
		  }
		  const okeys = optionalKeys(def.shape);
		  return {
		    ...def,
		    keys,
		    keySet: new Set(keys),
		    numKeys: keys.length,
		    optionalKeys: new Set(okeys)
		  };
		}
		function handleCatchall(proms, input, payload, ctx, def, inst) {
		  const unrecognized = [];
		  const keySet = def.keySet;
		  const _catchall = def.catchall._zod;
		  const t = _catchall.def.type;
		  const isOptionalIn = _catchall.optin === "optional";
		  const isOptionalOut = _catchall.optout === "optional";
		  for (const key in input) {
		    if (key === "__proto__")
		      continue;
		    if (keySet.has(key))
		      continue;
		    if (t === "never") {
		      unrecognized.push(key);
		      continue;
		    }
		    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
		    if (r instanceof Promise) {
		      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut)));
		    } else {
		      handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
		    }
		  }
		  if (unrecognized.length) {
		    payload.issues.push({
		      code: "unrecognized_keys",
		      keys: unrecognized,
		      input,
		      inst
		    });
		  }
		  if (!proms.length)
		    return payload;
		  return Promise.all(proms).then(() => {
		    return payload;
		  });
		}
		var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
		  $ZodType.init(inst, def);
		  const desc = Object.getOwnPropertyDescriptor(def, "shape");
		  if (!desc?.get) {
		    const sh = def.shape;
		    Object.defineProperty(def, "shape", {
		      get: () => {
		        const newSh = { ...sh };
		        Object.defineProperty(def, "shape", {
		          value: newSh
		        });
		        return newSh;
		      }
		    });
		  }
		  const _normalized = cached(() => normalizeDef(def));
		  defineLazy(inst._zod, "propValues", () => {
		    const shape = def.shape;
		    const propValues = {};
		    for (const key in shape) {
		      const field = shape[key]._zod;
		      if (field.values) {
		        propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
		        for (const v of field.values)
		          propValues[key].add(v);
		      }
		    }
		    return propValues;
		  });
		  const isObject2 = isObject;
		  const catchall = def.catchall;
		  let value;
		  inst._zod.parse = (payload, ctx) => {
		    value ?? (value = _normalized.value);
		    const input = payload.value;
		    if (!isObject2(input)) {
		      payload.issues.push({
		        expected: "object",
		        code: "invalid_type",
		        input,
		        inst
		      });
		      return payload;
		    }
		    payload.value = {};
		    const proms = [];
		    const shape = value.shape;
		    for (const key of value.keys) {
		      const el = shape[key];
		      const isOptionalIn = el._zod.optin === "optional";
		      const isOptionalOut = el._zod.optout === "optional";
		      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
		      if (r instanceof Promise) {
		        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut)));
		      } else {
		        handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
		      }
		    }
		    if (!catchall) {
		      return proms.length ? Promise.all(proms).then(() => payload) : payload;
		    }
		    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
		  };
		});
		var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
		  $ZodObject.init(inst, def);
		  const superParse = inst._zod.parse;
		  const _normalized = cached(() => normalizeDef(def));
		  const generateFastpass = (shape) => {
		    const doc = new Doc(["shape", "payload", "ctx"]);
		    const normalized = _normalized.value;
		    const parseStr = (key) => {
		      const k = esc(key);
		      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		    };
		    doc.write(`const input = payload.value;`);
		    const ids = /* @__PURE__ */ Object.create(null);
		    let counter = 0;
		    for (const key of normalized.keys) {
		      ids[key] = `key_${counter++}`;
		    }
		    doc.write(`const newResult = {};`);
		    for (const key of normalized.keys) {
		      const id = ids[key];
		      const k = esc(key);
		      const schema = shape[key];
		      const isOptionalIn = schema?._zod?.optin === "optional";
		      const isOptionalOut = schema?._zod?.optout === "optional";
		      doc.write(`const ${id} = ${parseStr(key)};`);
		      if (isOptionalIn && isOptionalOut) {
		        doc.write(`
		        if (${id}.issues.length) {
		          if (${k} in input) {
		            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
		              ...iss,
		              path: iss.path ? [${k}, ...iss.path] : [${k}]
		            })));
		          }
		        }
		        
		        if (${id}.value === undefined) {
		          if (${k} in input) {
		            newResult[${k}] = undefined;
		          }
		        } else {
		          newResult[${k}] = ${id}.value;
		        }
		        
		      `);
		      } else if (!isOptionalIn) {
		        doc.write(`
		        const ${id}_present = ${k} in input;
		        if (${id}.issues.length) {
		          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
		            ...iss,
		            path: iss.path ? [${k}, ...iss.path] : [${k}]
		          })));
		        }
		        if (!${id}_present && !${id}.issues.length) {
		          payload.issues.push({
		            code: "invalid_type",
		            expected: "nonoptional",
		            input: undefined,
		            path: [${k}]
		          });
		        }

		        if (${id}_present) {
		          if (${id}.value === undefined) {
		            newResult[${k}] = undefined;
		          } else {
		            newResult[${k}] = ${id}.value;
		          }
		        }

		      `);
		      } else {
		        doc.write(`
		        if (${id}.issues.length) {
		          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
		            ...iss,
		            path: iss.path ? [${k}, ...iss.path] : [${k}]
		          })));
		        }
		        
		        if (${id}.value === undefined) {
		          if (${k} in input) {
		            newResult[${k}] = undefined;
		          }
		        } else {
		          newResult[${k}] = ${id}.value;
		        }
		        
		      `);
		      }
		    }
		    doc.write(`payload.value = newResult;`);
		    doc.write(`return payload;`);
		    const fn = doc.compile();
		    return (payload, ctx) => fn(shape, payload, ctx);
		  };
		  let fastpass;
		  const isObject2 = isObject;
		  const jit = !globalConfig.jitless;
		  const allowsEval2 = allowsEval;
		  const fastEnabled = jit && allowsEval2.value;
		  const catchall = def.catchall;
		  let value;
		  inst._zod.parse = (payload, ctx) => {
		    value ?? (value = _normalized.value);
		    const input = payload.value;
		    if (!isObject2(input)) {
		      payload.issues.push({
		        expected: "object",
		        code: "invalid_type",
		        input,
		        inst
		      });
		      return payload;
		    }
		    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
		      if (!fastpass)
		        fastpass = generateFastpass(def.shape);
		      payload = fastpass(payload, ctx);
		      if (!catchall)
		        return payload;
		      return handleCatchall([], input, payload, ctx, value, inst);
		    }
		    return superParse(payload, ctx);
		  };
		});
		function handleUnionResults(results, final, inst, ctx) {
		  for (const result of results) {
		    if (result.issues.length === 0) {
		      final.value = result.value;
		      return final;
		    }
		  }
		  const nonaborted = results.filter((r) => !aborted(r));
		  if (nonaborted.length === 1) {
		    final.value = nonaborted[0].value;
		    return nonaborted[0];
		  }
		  final.issues.push({
		    code: "invalid_union",
		    input: final.value,
		    inst,
		    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
		  });
		  return final;
		}
		var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
		  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
		  defineLazy(inst._zod, "values", () => {
		    if (def.options.every((o) => o._zod.values)) {
		      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
		    }
		    return void 0;
		  });
		  defineLazy(inst._zod, "pattern", () => {
		    if (def.options.every((o) => o._zod.pattern)) {
		      const patterns = def.options.map((o) => o._zod.pattern);
		      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		    }
		    return void 0;
		  });
		  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
		  inst._zod.parse = (payload, ctx) => {
		    if (first) {
		      return first(payload, ctx);
		    }
		    let async = false;
		    const results = [];
		    for (const option of def.options) {
		      const result = option._zod.run({
		        value: payload.value,
		        issues: []
		      }, ctx);
		      if (result instanceof Promise) {
		        results.push(result);
		        async = true;
		      } else {
		        if (result.issues.length === 0)
		          return result;
		        results.push(result);
		      }
		    }
		    if (!async)
		      return handleUnionResults(results, payload, inst, ctx);
		    return Promise.all(results).then((results2) => {
		      return handleUnionResults(results2, payload, inst, ctx);
		    });
		  };
		});
		function handleExclusiveUnionResults(results, final, inst, ctx) {
		  const successes = results.filter((r) => r.issues.length === 0);
		  if (successes.length === 1) {
		    final.value = successes[0].value;
		    return final;
		  }
		  if (successes.length === 0) {
		    final.issues.push({
		      code: "invalid_union",
		      input: final.value,
		      inst,
		      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
		    });
		  } else {
		    final.issues.push({
		      code: "invalid_union",
		      input: final.value,
		      inst,
		      errors: [],
		      inclusive: false
		    });
		  }
		  return final;
		}
		var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
		  $ZodUnion.init(inst, def);
		  def.inclusive = false;
		  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
		  inst._zod.parse = (payload, ctx) => {
		    if (first) {
		      return first(payload, ctx);
		    }
		    let async = false;
		    const results = [];
		    for (const option of def.options) {
		      const result = option._zod.run({
		        value: payload.value,
		        issues: []
		      }, ctx);
		      if (result instanceof Promise) {
		        results.push(result);
		        async = true;
		      } else {
		        results.push(result);
		      }
		    }
		    if (!async)
		      return handleExclusiveUnionResults(results, payload, inst, ctx);
		    return Promise.all(results).then((results2) => {
		      return handleExclusiveUnionResults(results2, payload, inst, ctx);
		    });
		  };
		});
		var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
		  def.inclusive = false;
		  $ZodUnion.init(inst, def);
		  const _super = inst._zod.parse;
		  defineLazy(inst._zod, "propValues", () => {
		    const propValues = {};
		    for (const option of def.options) {
		      const pv = option._zod.propValues;
		      if (!pv || Object.keys(pv).length === 0)
		        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
		      for (const [k, v] of Object.entries(pv)) {
		        if (!propValues[k])
		          propValues[k] = /* @__PURE__ */ new Set();
		        for (const val of v) {
		          propValues[k].add(val);
		        }
		      }
		    }
		    return propValues;
		  });
		  const disc = cached(() => {
		    const opts = def.options;
		    const map2 = /* @__PURE__ */ new Map();
		    for (const o of opts) {
		      const values = o._zod.propValues?.[def.discriminator];
		      if (!values || values.size === 0)
		        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
		      for (const v of values) {
		        if (map2.has(v)) {
		          throw new Error(`Duplicate discriminator value "${String(v)}"`);
		        }
		        map2.set(v, o);
		      }
		    }
		    return map2;
		  });
		  inst._zod.parse = (payload, ctx) => {
		    const input = payload.value;
		    if (!isObject(input)) {
		      payload.issues.push({
		        code: "invalid_type",
		        expected: "object",
		        input,
		        inst
		      });
		      return payload;
		    }
		    const opt = disc.value.get(input?.[def.discriminator]);
		    if (opt) {
		      return opt._zod.run(payload, ctx);
		    }
		    if (def.unionFallback || ctx.direction === "backward") {
		      return _super(payload, ctx);
		    }
		    payload.issues.push({
		      code: "invalid_union",
		      errors: [],
		      note: "No matching discriminator",
		      discriminator: def.discriminator,
		      options: Array.from(disc.value.keys()),
		      input,
		      path: [def.discriminator],
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, ctx) => {
		    const input = payload.value;
		    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
		    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
		    const async = left instanceof Promise || right instanceof Promise;
		    if (async) {
		      return Promise.all([left, right]).then(([left2, right2]) => {
		        return handleIntersectionResults(payload, left2, right2);
		      });
		    }
		    return handleIntersectionResults(payload, left, right);
		  };
		});
		function mergeValues(a, b) {
		  if (a === b) {
		    return { valid: true, data: a };
		  }
		  if (a instanceof Date && b instanceof Date && +a === +b) {
		    return { valid: true, data: a };
		  }
		  if (isPlainObject(a) && isPlainObject(b)) {
		    const bKeys = Object.keys(b);
		    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		    const newObj = { ...a, ...b };
		    for (const key of sharedKeys) {
		      const sharedValue = mergeValues(a[key], b[key]);
		      if (!sharedValue.valid) {
		        return {
		          valid: false,
		          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
		        };
		      }
		      newObj[key] = sharedValue.data;
		    }
		    return { valid: true, data: newObj };
		  }
		  if (Array.isArray(a) && Array.isArray(b)) {
		    if (a.length !== b.length) {
		      return { valid: false, mergeErrorPath: [] };
		    }
		    const newArray = [];
		    for (let index = 0; index < a.length; index++) {
		      const itemA = a[index];
		      const itemB = b[index];
		      const sharedValue = mergeValues(itemA, itemB);
		      if (!sharedValue.valid) {
		        return {
		          valid: false,
		          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
		        };
		      }
		      newArray.push(sharedValue.data);
		    }
		    return { valid: true, data: newArray };
		  }
		  return { valid: false, mergeErrorPath: [] };
		}
		function handleIntersectionResults(result, left, right) {
		  const unrecKeys = /* @__PURE__ */ new Map();
		  let unrecIssue;
		  for (const iss of left.issues) {
		    if (iss.code === "unrecognized_keys") {
		      unrecIssue ?? (unrecIssue = iss);
		      for (const k of iss.keys) {
		        if (!unrecKeys.has(k))
		          unrecKeys.set(k, {});
		        unrecKeys.get(k).l = true;
		      }
		    } else {
		      result.issues.push(iss);
		    }
		  }
		  for (const iss of right.issues) {
		    if (iss.code === "unrecognized_keys") {
		      for (const k of iss.keys) {
		        if (!unrecKeys.has(k))
		          unrecKeys.set(k, {});
		        unrecKeys.get(k).r = true;
		      }
		    } else {
		      result.issues.push(iss);
		    }
		  }
		  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
		  if (bothKeys.length && unrecIssue) {
		    result.issues.push({ ...unrecIssue, keys: bothKeys });
		  }
		  if (aborted(result))
		    return result;
		  const merged = mergeValues(left.value, right.value);
		  if (!merged.valid) {
		    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
		  }
		  result.value = merged.data;
		  return result;
		}
		var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
		  $ZodType.init(inst, def);
		  const items = def.items;
		  inst._zod.parse = (payload, ctx) => {
		    const input = payload.value;
		    if (!Array.isArray(input)) {
		      payload.issues.push({
		        input,
		        inst,
		        expected: "tuple",
		        code: "invalid_type"
		      });
		      return payload;
		    }
		    payload.value = [];
		    const proms = [];
		    const optinStart = getTupleOptStart(items, "optin");
		    const optoutStart = getTupleOptStart(items, "optout");
		    if (!def.rest) {
		      if (input.length < optinStart) {
		        payload.issues.push({
		          code: "too_small",
		          minimum: optinStart,
		          inclusive: true,
		          input,
		          inst,
		          origin: "array"
		        });
		        return payload;
		      }
		      if (input.length > items.length) {
		        payload.issues.push({
		          code: "too_big",
		          maximum: items.length,
		          inclusive: true,
		          input,
		          inst,
		          origin: "array"
		        });
		      }
		    }
		    const itemResults = new Array(items.length);
		    for (let i = 0; i < items.length; i++) {
		      const r = items[i]._zod.run({ value: input[i], issues: [] }, ctx);
		      if (r instanceof Promise) {
		        proms.push(r.then((rr) => {
		          itemResults[i] = rr;
		        }));
		      } else {
		        itemResults[i] = r;
		      }
		    }
		    if (def.rest) {
		      let i = items.length - 1;
		      const rest = input.slice(items.length);
		      for (const el of rest) {
		        i++;
		        const result = def.rest._zod.run({ value: el, issues: [] }, ctx);
		        if (result instanceof Promise) {
		          proms.push(result.then((r) => handleTupleResult(r, payload, i)));
		        } else {
		          handleTupleResult(result, payload, i);
		        }
		      }
		    }
		    if (proms.length) {
		      return Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart));
		    }
		    return handleTupleResults(itemResults, payload, items, input, optoutStart);
		  };
		});
		function getTupleOptStart(items, key) {
		  for (let i = items.length - 1; i >= 0; i--) {
		    if (items[i]._zod[key] !== "optional")
		      return i + 1;
		  }
		  return 0;
		}
		function handleTupleResult(result, final, index) {
		  if (result.issues.length) {
		    final.issues.push(...prefixIssues(index, result.issues));
		  }
		  final.value[index] = result.value;
		}
		function handleTupleResults(itemResults, final, items, input, optoutStart) {
		  for (let i = 0; i < items.length; i++) {
		    const r = itemResults[i];
		    const isPresent = i < input.length;
		    if (r.issues.length) {
		      if (!isPresent && i >= optoutStart) {
		        final.value.length = i;
		        break;
		      }
		      final.issues.push(...prefixIssues(i, r.issues));
		    }
		    final.value[i] = r.value;
		  }
		  for (let i = final.value.length - 1; i >= input.length; i--) {
		    if (items[i]._zod.optout === "optional" && final.value[i] === void 0) {
		      final.value.length = i;
		    } else {
		      break;
		    }
		  }
		  return final;
		}
		var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, ctx) => {
		    const input = payload.value;
		    if (!isPlainObject(input)) {
		      payload.issues.push({
		        expected: "record",
		        code: "invalid_type",
		        input,
		        inst
		      });
		      return payload;
		    }
		    const proms = [];
		    const values = def.keyType._zod.values;
		    if (values) {
		      payload.value = {};
		      const recordKeys = /* @__PURE__ */ new Set();
		      for (const key of values) {
		        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
		          recordKeys.add(typeof key === "number" ? key.toString() : key);
		          const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
		          if (keyResult instanceof Promise) {
		            throw new Error("Async schemas not supported in object keys currently");
		          }
		          if (keyResult.issues.length) {
		            payload.issues.push({
		              code: "invalid_key",
		              origin: "record",
		              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
		              input: key,
		              path: [key],
		              inst
		            });
		            continue;
		          }
		          const outKey = keyResult.value;
		          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
		          if (result instanceof Promise) {
		            proms.push(result.then((result2) => {
		              if (result2.issues.length) {
		                payload.issues.push(...prefixIssues(key, result2.issues));
		              }
		              payload.value[outKey] = result2.value;
		            }));
		          } else {
		            if (result.issues.length) {
		              payload.issues.push(...prefixIssues(key, result.issues));
		            }
		            payload.value[outKey] = result.value;
		          }
		        }
		      }
		      let unrecognized;
		      for (const key in input) {
		        if (!recordKeys.has(key)) {
		          unrecognized = unrecognized ?? [];
		          unrecognized.push(key);
		        }
		      }
		      if (unrecognized && unrecognized.length > 0) {
		        payload.issues.push({
		          code: "unrecognized_keys",
		          input,
		          inst,
		          keys: unrecognized
		        });
		      }
		    } else {
		      payload.value = {};
		      for (const key of Reflect.ownKeys(input)) {
		        if (key === "__proto__")
		          continue;
		        if (!Object.prototype.propertyIsEnumerable.call(input, key))
		          continue;
		        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
		        if (keyResult instanceof Promise) {
		          throw new Error("Async schemas not supported in object keys currently");
		        }
		        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
		        if (checkNumericKey) {
		          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
		          if (retryResult instanceof Promise) {
		            throw new Error("Async schemas not supported in object keys currently");
		          }
		          if (retryResult.issues.length === 0) {
		            keyResult = retryResult;
		          }
		        }
		        if (keyResult.issues.length) {
		          if (def.mode === "loose") {
		            payload.value[key] = input[key];
		          } else {
		            payload.issues.push({
		              code: "invalid_key",
		              origin: "record",
		              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
		              input: key,
		              path: [key],
		              inst
		            });
		          }
		          continue;
		        }
		        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
		        if (result instanceof Promise) {
		          proms.push(result.then((result2) => {
		            if (result2.issues.length) {
		              payload.issues.push(...prefixIssues(key, result2.issues));
		            }
		            payload.value[keyResult.value] = result2.value;
		          }));
		        } else {
		          if (result.issues.length) {
		            payload.issues.push(...prefixIssues(key, result.issues));
		          }
		          payload.value[keyResult.value] = result.value;
		        }
		      }
		    }
		    if (proms.length) {
		      return Promise.all(proms).then(() => payload);
		    }
		    return payload;
		  };
		});
		var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, ctx) => {
		    const input = payload.value;
		    if (!(input instanceof Map)) {
		      payload.issues.push({
		        expected: "map",
		        code: "invalid_type",
		        input,
		        inst
		      });
		      return payload;
		    }
		    const proms = [];
		    payload.value = /* @__PURE__ */ new Map();
		    for (const [key, value] of input) {
		      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
		      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
		      if (keyResult instanceof Promise || valueResult instanceof Promise) {
		        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
		          handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
		        }));
		      } else {
		        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
		      }
		    }
		    if (proms.length)
		      return Promise.all(proms).then(() => payload);
		    return payload;
		  };
		});
		function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
		  if (keyResult.issues.length) {
		    if (propertyKeyTypes.has(typeof key)) {
		      final.issues.push(...prefixIssues(key, keyResult.issues));
		    } else {
		      final.issues.push({
		        code: "invalid_key",
		        origin: "map",
		        input,
		        inst,
		        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
		      });
		    }
		  }
		  if (valueResult.issues.length) {
		    if (propertyKeyTypes.has(typeof key)) {
		      final.issues.push(...prefixIssues(key, valueResult.issues));
		    } else {
		      final.issues.push({
		        origin: "map",
		        code: "invalid_element",
		        input,
		        inst,
		        key,
		        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
		      });
		    }
		  }
		  final.value.set(keyResult.value, valueResult.value);
		}
		var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, ctx) => {
		    const input = payload.value;
		    if (!(input instanceof Set)) {
		      payload.issues.push({
		        input,
		        inst,
		        expected: "set",
		        code: "invalid_type"
		      });
		      return payload;
		    }
		    const proms = [];
		    payload.value = /* @__PURE__ */ new Set();
		    for (const item of input) {
		      const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
		      if (result instanceof Promise) {
		        proms.push(result.then((result2) => handleSetResult(result2, payload)));
		      } else
		        handleSetResult(result, payload);
		    }
		    if (proms.length)
		      return Promise.all(proms).then(() => payload);
		    return payload;
		  };
		});
		function handleSetResult(result, final) {
		  if (result.issues.length) {
		    final.issues.push(...result.issues);
		  }
		  final.value.add(result.value);
		}
		var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
		  $ZodType.init(inst, def);
		  const values = getEnumValues(def.entries);
		  const valuesSet = new Set(values);
		  inst._zod.values = valuesSet;
		  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
		  inst._zod.parse = (payload, _ctx) => {
		    const input = payload.value;
		    if (valuesSet.has(input)) {
		      return payload;
		    }
		    payload.issues.push({
		      code: "invalid_value",
		      values,
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
		  $ZodType.init(inst, def);
		  if (def.values.length === 0) {
		    throw new Error("Cannot create literal schema with no valid values");
		  }
		  const values = new Set(def.values);
		  inst._zod.values = values;
		  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
		  inst._zod.parse = (payload, _ctx) => {
		    const input = payload.value;
		    if (values.has(input)) {
		      return payload;
		    }
		    payload.issues.push({
		      code: "invalid_value",
		      values: def.values,
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, _ctx) => {
		    const input = payload.value;
		    if (input instanceof File)
		      return payload;
		    payload.issues.push({
		      expected: "file",
		      code: "invalid_type",
		      input,
		      inst
		    });
		    return payload;
		  };
		});
		var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      throw new $ZodEncodeError(inst.constructor.name);
		    }
		    const _out = def.transform(payload.value, payload);
		    if (ctx.async) {
		      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
		      return output.then((output2) => {
		        payload.value = output2;
		        payload.fallback = true;
		        return payload;
		      });
		    }
		    if (_out instanceof Promise) {
		      throw new $ZodAsyncError();
		    }
		    payload.value = _out;
		    payload.fallback = true;
		    return payload;
		  };
		});
		function handleOptionalResult(result, input) {
		  if (input === void 0 && (result.issues.length || result.fallback)) {
		    return { issues: [], value: void 0 };
		  }
		  return result;
		}
		var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  inst._zod.optout = "optional";
		  defineLazy(inst._zod, "values", () => {
		    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
		  });
		  defineLazy(inst._zod, "pattern", () => {
		    const pattern = def.innerType._zod.pattern;
		    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
		  });
		  inst._zod.parse = (payload, ctx) => {
		    if (def.innerType._zod.optin === "optional") {
		      const input = payload.value;
		      const result = def.innerType._zod.run(payload, ctx);
		      if (result instanceof Promise)
		        return result.then((r) => handleOptionalResult(r, input));
		      return handleOptionalResult(result, input);
		    }
		    if (payload.value === void 0) {
		      return payload;
		    }
		    return def.innerType._zod.run(payload, ctx);
		  };
		});
		var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
		  $ZodOptional.init(inst, def);
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
		  inst._zod.parse = (payload, ctx) => {
		    return def.innerType._zod.run(payload, ctx);
		  };
		});
		var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
		  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
		  defineLazy(inst._zod, "pattern", () => {
		    const pattern = def.innerType._zod.pattern;
		    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
		  });
		  defineLazy(inst._zod, "values", () => {
		    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
		  });
		  inst._zod.parse = (payload, ctx) => {
		    if (payload.value === null)
		      return payload;
		    return def.innerType._zod.run(payload, ctx);
		  };
		});
		var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      return def.innerType._zod.run(payload, ctx);
		    }
		    if (payload.value === void 0) {
		      payload.value = def.defaultValue;
		      return payload;
		    }
		    const result = def.innerType._zod.run(payload, ctx);
		    if (result instanceof Promise) {
		      return result.then((result2) => handleDefaultResult(result2, def));
		    }
		    return handleDefaultResult(result, def);
		  };
		});
		function handleDefaultResult(payload, def) {
		  if (payload.value === void 0) {
		    payload.value = def.defaultValue;
		  }
		  return payload;
		}
		var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      return def.innerType._zod.run(payload, ctx);
		    }
		    if (payload.value === void 0) {
		      payload.value = def.defaultValue;
		    }
		    return def.innerType._zod.run(payload, ctx);
		  };
		});
		var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "values", () => {
		    const v = def.innerType._zod.values;
		    return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
		  });
		  inst._zod.parse = (payload, ctx) => {
		    const result = def.innerType._zod.run(payload, ctx);
		    if (result instanceof Promise) {
		      return result.then((result2) => handleNonOptionalResult(result2, inst));
		    }
		    return handleNonOptionalResult(result, inst);
		  };
		});
		function handleNonOptionalResult(payload, inst) {
		  if (!payload.issues.length && payload.value === void 0) {
		    payload.issues.push({
		      code: "invalid_type",
		      expected: "nonoptional",
		      input: payload.value,
		      inst
		    });
		  }
		  return payload;
		}
		var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      throw new $ZodEncodeError("ZodSuccess");
		    }
		    const result = def.innerType._zod.run(payload, ctx);
		    if (result instanceof Promise) {
		      return result.then((result2) => {
		        payload.value = result2.issues.length === 0;
		        return payload;
		      });
		    }
		    payload.value = result.issues.length === 0;
		    return payload;
		  };
		});
		var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.optin = "optional";
		  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      return def.innerType._zod.run(payload, ctx);
		    }
		    const result = def.innerType._zod.run(payload, ctx);
		    if (result instanceof Promise) {
		      return result.then((result2) => {
		        payload.value = result2.value;
		        if (result2.issues.length) {
		          payload.value = def.catchValue({
		            ...payload,
		            error: {
		              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
		            },
		            input: payload.value
		          });
		          payload.issues = [];
		          payload.fallback = true;
		        }
		        return payload;
		      });
		    }
		    payload.value = result.value;
		    if (result.issues.length) {
		      payload.value = def.catchValue({
		        ...payload,
		        error: {
		          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
		        },
		        input: payload.value
		      });
		      payload.issues = [];
		      payload.fallback = true;
		    }
		    return payload;
		  };
		});
		var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, _ctx) => {
		    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
		      payload.issues.push({
		        input: payload.value,
		        inst,
		        expected: "nan",
		        code: "invalid_type"
		      });
		      return payload;
		    }
		    return payload;
		  };
		});
		var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "values", () => def.in._zod.values);
		  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
		  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
		  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      const right = def.out._zod.run(payload, ctx);
		      if (right instanceof Promise) {
		        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
		      }
		      return handlePipeResult(right, def.in, ctx);
		    }
		    const left = def.in._zod.run(payload, ctx);
		    if (left instanceof Promise) {
		      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
		    }
		    return handlePipeResult(left, def.out, ctx);
		  };
		});
		function handlePipeResult(left, next, ctx) {
		  if (left.issues.length) {
		    left.aborted = true;
		    return left;
		  }
		  return next._zod.run({ value: left.value, issues: left.issues, fallback: left.fallback }, ctx);
		}
		var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "values", () => def.in._zod.values);
		  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
		  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
		  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
		  inst._zod.parse = (payload, ctx) => {
		    const direction = ctx.direction || "forward";
		    if (direction === "forward") {
		      const left = def.in._zod.run(payload, ctx);
		      if (left instanceof Promise) {
		        return left.then((left2) => handleCodecAResult(left2, def, ctx));
		      }
		      return handleCodecAResult(left, def, ctx);
		    } else {
		      const right = def.out._zod.run(payload, ctx);
		      if (right instanceof Promise) {
		        return right.then((right2) => handleCodecAResult(right2, def, ctx));
		      }
		      return handleCodecAResult(right, def, ctx);
		    }
		  };
		});
		function handleCodecAResult(result, def, ctx) {
		  if (result.issues.length) {
		    result.aborted = true;
		    return result;
		  }
		  const direction = ctx.direction || "forward";
		  if (direction === "forward") {
		    const transformed = def.transform(result.value, result);
		    if (transformed instanceof Promise) {
		      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
		    }
		    return handleCodecTxResult(result, transformed, def.out, ctx);
		  } else {
		    const transformed = def.reverseTransform(result.value, result);
		    if (transformed instanceof Promise) {
		      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
		    }
		    return handleCodecTxResult(result, transformed, def.in, ctx);
		  }
		}
		function handleCodecTxResult(left, value, nextSchema, ctx) {
		  if (left.issues.length) {
		    left.aborted = true;
		    return left;
		  }
		  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
		}
		var $ZodPreprocess = /* @__PURE__ */ $constructor("$ZodPreprocess", (inst, def) => {
		  $ZodPipe.init(inst, def);
		});
		var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
		  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
		  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
		  inst._zod.parse = (payload, ctx) => {
		    if (ctx.direction === "backward") {
		      return def.innerType._zod.run(payload, ctx);
		    }
		    const result = def.innerType._zod.run(payload, ctx);
		    if (result instanceof Promise) {
		      return result.then(handleReadonlyResult);
		    }
		    return handleReadonlyResult(result);
		  };
		});
		function handleReadonlyResult(payload) {
		  payload.value = Object.freeze(payload.value);
		  return payload;
		}
		var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
		  $ZodType.init(inst, def);
		  const regexParts = [];
		  for (const part of def.parts) {
		    if (typeof part === "object" && part !== null) {
		      if (!part._zod.pattern) {
		        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
		      }
		      const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
		      if (!source)
		        throw new Error(`Invalid template literal part: ${part._zod.traits}`);
		      const start = source.startsWith("^") ? 1 : 0;
		      const end = source.endsWith("$") ? source.length - 1 : source.length;
		      regexParts.push(source.slice(start, end));
		    } else if (part === null || primitiveTypes.has(typeof part)) {
		      regexParts.push(escapeRegex(`${part}`));
		    } else {
		      throw new Error(`Invalid template literal part: ${part}`);
		    }
		  }
		  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
		  inst._zod.parse = (payload, _ctx) => {
		    if (typeof payload.value !== "string") {
		      payload.issues.push({
		        input: payload.value,
		        inst,
		        expected: "string",
		        code: "invalid_type"
		      });
		      return payload;
		    }
		    inst._zod.pattern.lastIndex = 0;
		    if (!inst._zod.pattern.test(payload.value)) {
		      payload.issues.push({
		        input: payload.value,
		        inst,
		        code: "invalid_format",
		        format: def.format ?? "template_literal",
		        pattern: inst._zod.pattern.source
		      });
		      return payload;
		    }
		    return payload;
		  };
		});
		var $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._def = def;
		  inst._zod.def = def;
		  inst.implement = (func) => {
		    if (typeof func !== "function") {
		      throw new Error("implement() must be called with a function");
		    }
		    return function(...args) {
		      const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
		      const result = Reflect.apply(func, this, parsedArgs);
		      if (inst._def.output) {
		        return parse(inst._def.output, result);
		      }
		      return result;
		    };
		  };
		  inst.implementAsync = (func) => {
		    if (typeof func !== "function") {
		      throw new Error("implementAsync() must be called with a function");
		    }
		    return async function(...args) {
		      const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
		      const result = await Reflect.apply(func, this, parsedArgs);
		      if (inst._def.output) {
		        return await parseAsync(inst._def.output, result);
		      }
		      return result;
		    };
		  };
		  inst._zod.parse = (payload, _ctx) => {
		    if (typeof payload.value !== "function") {
		      payload.issues.push({
		        code: "invalid_type",
		        expected: "function",
		        input: payload.value,
		        inst
		      });
		      return payload;
		    }
		    const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
		    if (hasPromiseOutput) {
		      payload.value = inst.implementAsync(payload.value);
		    } else {
		      payload.value = inst.implement(payload.value);
		    }
		    return payload;
		  };
		  inst.input = (...args) => {
		    const F = inst.constructor;
		    if (Array.isArray(args[0])) {
		      return new F({
		        type: "function",
		        input: new $ZodTuple({
		          type: "tuple",
		          items: args[0],
		          rest: args[1]
		        }),
		        output: inst._def.output
		      });
		    }
		    return new F({
		      type: "function",
		      input: args[0],
		      output: inst._def.output
		    });
		  };
		  inst.output = (output) => {
		    const F = inst.constructor;
		    return new F({
		      type: "function",
		      input: inst._def.input,
		      output
		    });
		  };
		  return inst;
		});
		var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, ctx) => {
		    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
		  };
		});
		var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
		  $ZodType.init(inst, def);
		  defineLazy(inst._zod, "innerType", () => {
		    const d = def;
		    if (!d._cachedInner)
		      d._cachedInner = def.getter();
		    return d._cachedInner;
		  });
		  defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
		  defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
		  defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
		  defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
		  inst._zod.parse = (payload, ctx) => {
		    const inner = inst._zod.innerType;
		    return inner._zod.run(payload, ctx);
		  };
		});
		var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
		  $ZodCheck.init(inst, def);
		  $ZodType.init(inst, def);
		  inst._zod.parse = (payload, _) => {
		    return payload;
		  };
		  inst._zod.check = (payload) => {
		    const input = payload.value;
		    const r = def.fn(input);
		    if (r instanceof Promise) {
		      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
		    }
		    handleRefineResult(r, payload, input, inst);
		    return;
		  };
		});
		function handleRefineResult(result, payload, input, inst) {
		  if (!result) {
		    const _iss = {
		      code: "custom",
		      input,
		      inst,
		      // incorporates params.error into issue reporting
		      path: [...inst._zod.def.path ?? []],
		      // incorporates params.error into issue reporting
		      continue: !inst._zod.def.abort
		      // params: inst._zod.def.params,
		    };
		    if (inst._zod.def.params)
		      _iss.params = inst._zod.def.params;
		    payload.issues.push(issue(_iss));
		  }
		}

		// node_modules/zod/v4/locales/index.js
		var locales_exports = {};
		__export(locales_exports, {
		  ar: () => ar_default,
		  az: () => az_default,
		  be: () => be_default,
		  bg: () => bg_default,
		  ca: () => ca_default,
		  cs: () => cs_default,
		  da: () => da_default,
		  de: () => de_default,
		  el: () => el_default,
		  en: () => en_default,
		  eo: () => eo_default,
		  es: () => es_default,
		  fa: () => fa_default,
		  fi: () => fi_default,
		  fr: () => fr_default,
		  frCA: () => fr_CA_default,
		  he: () => he_default,
		  hr: () => hr_default,
		  hu: () => hu_default,
		  hy: () => hy_default,
		  id: () => id_default,
		  is: () => is_default,
		  it: () => it_default,
		  ja: () => ja_default,
		  ka: () => ka_default,
		  kh: () => kh_default,
		  km: () => km_default,
		  ko: () => ko_default,
		  lt: () => lt_default,
		  mk: () => mk_default,
		  ms: () => ms_default,
		  nl: () => nl_default,
		  no: () => no_default,
		  ota: () => ota_default,
		  pl: () => pl_default,
		  ps: () => ps_default,
		  pt: () => pt_default,
		  ro: () => ro_default,
		  ru: () => ru_default,
		  sl: () => sl_default,
		  sv: () => sv_default,
		  ta: () => ta_default,
		  th: () => th_default,
		  tr: () => tr_default,
		  ua: () => ua_default,
		  uk: () => uk_default,
		  ur: () => ur_default,
		  uz: () => uz_default,
		  vi: () => vi_default,
		  yo: () => yo_default,
		  zhCN: () => zh_CN_default,
		  zhTW: () => zh_TW_default
		});

		// node_modules/zod/v4/locales/ar.js
		var error = () => {
		  const Sizable = {
		    string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
		    file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
		    array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
		    set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0645\u062F\u062E\u0644",
		    email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
		    url: "\u0631\u0627\u0628\u0637",
		    emoji: "\u0625\u064A\u0645\u0648\u062C\u064A",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
		    date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
		    time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
		    duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
		    ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4",
		    ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6",
		    cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4",
		    cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6",
		    base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded",
		    base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded",
		    json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON",
		    e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164",
		    jwt: "JWT",
		    template_literal: "\u0645\u062F\u062E\u0644"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${issue2.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
		        }
		        return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"}`;
		        return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${issue2.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${_issue.pattern}`;
		        return `${FormatDictionary[_issue.format] ?? issue2.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
		      }
		      case "not_multiple_of":
		        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `\u0645\u0639\u0631\u0641${issue2.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${issue2.keys.length > 1 ? "\u0629" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
		      case "invalid_key":
		        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
		      case "invalid_union":
		        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
		      case "invalid_element":
		        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
		      default:
		        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
		    }
		  };
		};
		function ar_default() {
		  return {
		    localeError: error()
		  };
		}

		// node_modules/zod/v4/locales/az.js
		var error2 = () => {
		  const Sizable = {
		    string: { unit: "simvol", verb: "olmal\u0131d\u0131r" },
		    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
		    array: { unit: "element", verb: "olmal\u0131d\u0131r" },
		    set: { unit: "element", verb: "olmal\u0131d\u0131r" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "input",
		    email: "email address",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO datetime",
		    date: "ISO date",
		    time: "ISO time",
		    duration: "ISO duration",
		    ipv4: "IPv4 address",
		    ipv6: "IPv6 address",
		    cidrv4: "IPv4 range",
		    cidrv6: "IPv6 range",
		    base64: "base64-encoded string",
		    base64url: "base64url-encoded string",
		    json_string: "JSON string",
		    e164: "E.164 number",
		    jwt: "JWT",
		    template_literal: "input"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${issue2.expected}, daxil olan ${received}`;
		        }
		        return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${expected}, daxil olan ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${stringifyPrimitive(issue2.values[0])}`;
		        return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
		        return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Yanl\u0131\u015F m\u0259tn: "${_issue.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
		        if (_issue.format === "ends_with")
		          return `Yanl\u0131\u015F m\u0259tn: "${_issue.suffix}" il\u0259 bitm\u0259lidir`;
		        if (_issue.format === "includes")
		          return `Yanl\u0131\u015F m\u0259tn: "${_issue.includes}" daxil olmal\u0131d\u0131r`;
		        if (_issue.format === "regex")
		          return `Yanl\u0131\u015F m\u0259tn: ${_issue.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
		        return `Yanl\u0131\u015F ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Yanl\u0131\u015F \u0259d\u0259d: ${issue2.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
		      case "unrecognized_keys":
		        return `Tan\u0131nmayan a\xE7ar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
		      case "invalid_union":
		        return "Yanl\u0131\u015F d\u0259y\u0259r";
		      case "invalid_element":
		        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
		      default:
		        return `Yanl\u0131\u015F d\u0259y\u0259r`;
		    }
		  };
		};
		function az_default() {
		  return {
		    localeError: error2()
		  };
		}

		// node_modules/zod/v4/locales/be.js
		function getBelarusianPlural(count, one, few, many) {
		  const absCount = Math.abs(count);
		  const lastDigit = absCount % 10;
		  const lastTwoDigits = absCount % 100;
		  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		    return many;
		  }
		  if (lastDigit === 1) {
		    return one;
		  }
		  if (lastDigit >= 2 && lastDigit <= 4) {
		    return few;
		  }
		  return many;
		}
		var error3 = () => {
		  const Sizable = {
		    string: {
		      unit: {
		        one: "\u0441\u0456\u043C\u0432\u0430\u043B",
		        few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
		        many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E"
		      },
		      verb: "\u043C\u0435\u0446\u044C"
		    },
		    array: {
		      unit: {
		        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
		        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
		        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
		      },
		      verb: "\u043C\u0435\u0446\u044C"
		    },
		    set: {
		      unit: {
		        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
		        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
		        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
		      },
		      verb: "\u043C\u0435\u0446\u044C"
		    },
		    file: {
		      unit: {
		        one: "\u0431\u0430\u0439\u0442",
		        few: "\u0431\u0430\u0439\u0442\u044B",
		        many: "\u0431\u0430\u0439\u0442\u0430\u045E"
		      },
		      verb: "\u043C\u0435\u0446\u044C"
		    }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0443\u0432\u043E\u0434",
		    email: "email \u0430\u0434\u0440\u0430\u0441",
		    url: "URL",
		    emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
		    date: "ISO \u0434\u0430\u0442\u0430",
		    time: "ISO \u0447\u0430\u0441",
		    duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
		    ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
		    ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
		    cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
		    cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
		    base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
		    base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
		    json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
		    e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
		    jwt: "JWT",
		    template_literal: "\u0443\u0432\u043E\u0434"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u043B\u0456\u043A",
		    array: "\u043C\u0430\u0441\u0456\u045E"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${issue2.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
		        }
		        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          const maxValue = Number(issue2.maximum);
		          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
		          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
		        }
		        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          const minValue = Number(issue2.minimum);
		          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
		          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
		        }
		        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
		        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${issue2.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
		      case "invalid_union":
		        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
		      case "invalid_element":
		        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${issue2.origin}`;
		      default:
		        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434`;
		    }
		  };
		};
		function be_default() {
		  return {
		    localeError: error3()
		  };
		}

		// node_modules/zod/v4/locales/bg.js
		var error4 = () => {
		  const Sizable = {
		    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
		    file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
		    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
		    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0432\u0445\u043E\u0434",
		    email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441",
		    url: "URL",
		    emoji: "\u0435\u043C\u043E\u0434\u0436\u0438",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO \u0432\u0440\u0435\u043C\u0435",
		    date: "ISO \u0434\u0430\u0442\u0430",
		    time: "ISO \u0432\u0440\u0435\u043C\u0435",
		    duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442",
		    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
		    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
		    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
		    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
		    base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
		    base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
		    json_string: "JSON \u043D\u0438\u0437",
		    e164: "E.164 \u043D\u043E\u043C\u0435\u0440",
		    jwt: "JWT",
		    template_literal: "\u0432\u0445\u043E\u0434"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0447\u0438\u0441\u043B\u043E",
		    array: "\u043C\u0430\u0441\u0438\u0432"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
		        }
		        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}`;
		        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${_issue.pattern}`;
		        let invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
		        if (_issue.format === "emoji")
		          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
		        if (_issue.format === "datetime")
		          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
		        if (_issue.format === "date")
		          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
		        if (_issue.format === "time")
		          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
		        if (_issue.format === "duration")
		          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
		        return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${issue2.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
		      case "invalid_union":
		        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
		      case "invalid_element":
		        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${issue2.origin}`;
		      default:
		        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434`;
		    }
		  };
		};
		function bg_default() {
		  return {
		    localeError: error4()
		  };
		}

		// node_modules/zod/v4/locales/ca.js
		var error5 = () => {
		  const Sizable = {
		    string: { unit: "car\xE0cters", verb: "contenir" },
		    file: { unit: "bytes", verb: "contenir" },
		    array: { unit: "elements", verb: "contenir" },
		    set: { unit: "elements", verb: "contenir" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "entrada",
		    email: "adre\xE7a electr\xF2nica",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "data i hora ISO",
		    date: "data ISO",
		    time: "hora ISO",
		    duration: "durada ISO",
		    ipv4: "adre\xE7a IPv4",
		    ipv6: "adre\xE7a IPv6",
		    cidrv4: "rang IPv4",
		    cidrv6: "rang IPv6",
		    base64: "cadena codificada en base64",
		    base64url: "cadena codificada en base64url",
		    json_string: "cadena JSON",
		    e164: "n\xFAmero E.164",
		    jwt: "JWT",
		    template_literal: "entrada"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Tipus inv\xE0lid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
		        }
		        return `Tipus inv\xE0lid: s'esperava ${expected}, s'ha rebut ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Valor inv\xE0lid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
		        return `Opci\xF3 inv\xE0lida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "com a m\xE0xim" : "menys de";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingu\xE9s ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
		        return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? "com a m\xEDnim" : "m\xE9s de";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Massa petit: s'esperava que ${issue2.origin} contingu\xE9s ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `Format inv\xE0lid: ha de comen\xE7ar amb "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `Format inv\xE0lid: ha d'acabar amb "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Format inv\xE0lid: ha d'incloure "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${_issue.pattern}`;
		        return `Format inv\xE0lid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Clau inv\xE0lida a ${issue2.origin}`;
		      case "invalid_union":
		        return "Entrada inv\xE0lida";
		      // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
		      case "invalid_element":
		        return `Element inv\xE0lid a ${issue2.origin}`;
		      default:
		        return `Entrada inv\xE0lida`;
		    }
		  };
		};
		function ca_default() {
		  return {
		    localeError: error5()
		  };
		}

		// node_modules/zod/v4/locales/cs.js
		var error6 = () => {
		  const Sizable = {
		    string: { unit: "znak\u016F", verb: "m\xEDt" },
		    file: { unit: "bajt\u016F", verb: "m\xEDt" },
		    array: { unit: "prvk\u016F", verb: "m\xEDt" },
		    set: { unit: "prvk\u016F", verb: "m\xEDt" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "regul\xE1rn\xED v\xFDraz",
		    email: "e-mailov\xE1 adresa",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "datum a \u010Das ve form\xE1tu ISO",
		    date: "datum ve form\xE1tu ISO",
		    time: "\u010Das ve form\xE1tu ISO",
		    duration: "doba trv\xE1n\xED ISO",
		    ipv4: "IPv4 adresa",
		    ipv6: "IPv6 adresa",
		    cidrv4: "rozsah IPv4",
		    cidrv6: "rozsah IPv6",
		    base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
		    base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
		    json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
		    e164: "\u010D\xEDslo E.164",
		    jwt: "JWT",
		    template_literal: "vstup"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u010D\xEDslo",
		    string: "\u0159et\u011Bzec",
		    function: "funkce",
		    array: "pole"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${issue2.expected}, obdr\u017Eeno ${received}`;
		        }
		        return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${expected}, obdr\u017Eeno ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${stringifyPrimitive(issue2.values[0])}`;
		        return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
		        }
		        return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
		        }
		        return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${_issue.pattern}`;
		        return `Neplatn\xFD form\xE1t ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Nezn\xE1m\xE9 kl\xED\u010De: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Neplatn\xFD kl\xED\u010D v ${issue2.origin}`;
		      case "invalid_union":
		        return "Neplatn\xFD vstup";
		      case "invalid_element":
		        return `Neplatn\xE1 hodnota v ${issue2.origin}`;
		      default:
		        return `Neplatn\xFD vstup`;
		    }
		  };
		};
		function cs_default() {
		  return {
		    localeError: error6()
		  };
		}

		// node_modules/zod/v4/locales/da.js
		var error7 = () => {
		  const Sizable = {
		    string: { unit: "tegn", verb: "havde" },
		    file: { unit: "bytes", verb: "havde" },
		    array: { unit: "elementer", verb: "indeholdt" },
		    set: { unit: "elementer", verb: "indeholdt" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "input",
		    email: "e-mailadresse",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO dato- og klokkesl\xE6t",
		    date: "ISO-dato",
		    time: "ISO-klokkesl\xE6t",
		    duration: "ISO-varighed",
		    ipv4: "IPv4-omr\xE5de",
		    ipv6: "IPv6-omr\xE5de",
		    cidrv4: "IPv4-spektrum",
		    cidrv6: "IPv6-spektrum",
		    base64: "base64-kodet streng",
		    base64url: "base64url-kodet streng",
		    json_string: "JSON-streng",
		    e164: "E.164-nummer",
		    jwt: "JWT",
		    template_literal: "input"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    string: "streng",
		    number: "tal",
		    boolean: "boolean",
		    array: "liste",
		    object: "objekt",
		    set: "s\xE6t",
		    file: "fil"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
		        }
		        return `Ugyldigt input: forventede ${expected}, fik ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Ugyldig v\xE6rdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
		        return `Ugyldigt valg: forventede en af f\xF8lgende ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
		        if (sizing)
		          return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
		        return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
		        if (sizing) {
		          return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Ugyldig streng: skal matche m\xF8nsteret ${_issue.pattern}`;
		        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Ugyldigt tal: skal v\xE6re deleligt med ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `${issue2.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Ugyldig n\xF8gle i ${issue2.origin}`;
		      case "invalid_union":
		        return "Ugyldigt input: matcher ingen af de tilladte typer";
		      case "invalid_element":
		        return `Ugyldig v\xE6rdi i ${issue2.origin}`;
		      default:
		        return `Ugyldigt input`;
		    }
		  };
		};
		function da_default() {
		  return {
		    localeError: error7()
		  };
		}

		// node_modules/zod/v4/locales/de.js
		var error8 = () => {
		  const Sizable = {
		    string: { unit: "Zeichen", verb: "zu haben" },
		    file: { unit: "Bytes", verb: "zu haben" },
		    array: { unit: "Elemente", verb: "zu haben" },
		    set: { unit: "Elemente", verb: "zu haben" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "Eingabe",
		    email: "E-Mail-Adresse",
		    url: "URL",
		    emoji: "Emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO-Datum und -Uhrzeit",
		    date: "ISO-Datum",
		    time: "ISO-Uhrzeit",
		    duration: "ISO-Dauer",
		    ipv4: "IPv4-Adresse",
		    ipv6: "IPv6-Adresse",
		    cidrv4: "IPv4-Bereich",
		    cidrv6: "IPv6-Bereich",
		    base64: "Base64-codierter String",
		    base64url: "Base64-URL-codierter String",
		    json_string: "JSON-String",
		    e164: "E.164-Nummer",
		    jwt: "JWT",
		    template_literal: "Eingabe"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "Zahl",
		    array: "Array"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Ung\xFCltige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
		        }
		        return `Ung\xFCltige Eingabe: erwartet ${expected}, erhalten ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Ung\xFCltige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
		        return `Ung\xFCltige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
		        return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
		        }
		        return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Ung\xFCltiger String: muss mit "${_issue.prefix}" beginnen`;
		        if (_issue.format === "ends_with")
		          return `Ung\xFCltiger String: muss mit "${_issue.suffix}" enden`;
		        if (_issue.format === "includes")
		          return `Ung\xFCltiger String: muss "${_issue.includes}" enthalten`;
		        if (_issue.format === "regex")
		          return `Ung\xFCltiger String: muss dem Muster ${_issue.pattern} entsprechen`;
		        return `Ung\xFCltig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
		      case "unrecognized_keys":
		        return `${issue2.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Ung\xFCltiger Schl\xFCssel in ${issue2.origin}`;
		      case "invalid_union":
		        return "Ung\xFCltige Eingabe";
		      case "invalid_element":
		        return `Ung\xFCltiger Wert in ${issue2.origin}`;
		      default:
		        return `Ung\xFCltige Eingabe`;
		    }
		  };
		};
		function de_default() {
		  return {
		    localeError: error8()
		  };
		}

		// node_modules/zod/v4/locales/el.js
		var error9 = () => {
		  const Sizable = {
		    string: { unit: "\u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
		    file: { unit: "bytes", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
		    array: { unit: "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
		    set: { unit: "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
		    map: { unit: "\u03BA\u03B1\u03C4\u03B1\u03C7\u03C9\u03C1\u03AE\u03C3\u03B5\u03B9\u03C2", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2",
		    email: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 email",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03BA\u03B1\u03B9 \u03CE\u03C1\u03B1",
		    date: "ISO \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1",
		    time: "ISO \u03CE\u03C1\u03B1",
		    duration: "ISO \u03B4\u03B9\u03AC\u03C1\u03BA\u03B5\u03B9\u03B1",
		    ipv4: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 IPv4",
		    ipv6: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 IPv6",
		    mac: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 MAC",
		    cidrv4: "\u03B5\u03CD\u03C1\u03BF\u03C2 IPv4",
		    cidrv6: "\u03B5\u03CD\u03C1\u03BF\u03C2 IPv6",
		    base64: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B7 \u03C3\u03B5 base64",
		    base64url: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B7 \u03C3\u03B5 base64url",
		    json_string: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC JSON",
		    e164: "\u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 E.164",
		    jwt: "JWT",
		    template_literal: "\u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (typeof issue2.expected === "string" && /^[A-Z]/.test(issue2.expected)) {
		          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD instanceof ${issue2.expected}, \u03BB\u03AE\u03C6\u03B8\u03B7\u03BA\u03B5 ${received}`;
		        }
		        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${expected}, \u03BB\u03AE\u03C6\u03B8\u03B7\u03BA\u03B5 ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD \u03AD\u03BD\u03B1 \u03B1\u03C0\u03CC ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin ?? "\u03C4\u03B9\u03BC\u03AE"} \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1"}`;
		        return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin ?? "\u03C4\u03B9\u03BC\u03AE"} \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03CC: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin} \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03CC: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin} \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03BE\u03B5\u03BA\u03B9\u03BD\u03AC \u03BC\u03B5 "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03BD\u03B5\u03B9 \u03BC\u03B5 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C0\u03B5\u03C1\u03B9\u03AD\u03C7\u03B5\u03B9 "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C4\u03B1\u03B9\u03C1\u03B9\u03AC\u03B6\u03B5\u03B9 \u03BC\u03B5 \u03C4\u03BF \u03BC\u03BF\u03C4\u03AF\u03B2\u03BF ${_issue.pattern}`;
		        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF: ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03BB\u03B1\u03C0\u03BB\u03AC\u03C3\u03B9\u03BF \u03C4\u03BF\u03C5 ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `\u0386\u03B3\u03BD\u03C9\u03C3\u03C4${issue2.keys.length > 1 ? "\u03B1" : "\u03BF"} \u03BA\u03BB\u03B5\u03B9\u03B4${issue2.keys.length > 1 ? "\u03B9\u03AC" : "\u03AF"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF \u03BA\u03BB\u03B5\u03B9\u03B4\u03AF \u03C3\u03C4\u03BF ${issue2.origin}`;
		      case "invalid_union":
		        return "\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2";
		      case "invalid_element":
		        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C4\u03B9\u03BC\u03AE \u03C3\u03C4\u03BF ${issue2.origin}`;
		      default:
		        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2`;
		    }
		  };
		};
		function el_default() {
		  return {
		    localeError: error9()
		  };
		}

		// node_modules/zod/v4/locales/en.js
		var error10 = () => {
		  const Sizable = {
		    string: { unit: "characters", verb: "to have" },
		    file: { unit: "bytes", verb: "to have" },
		    array: { unit: "items", verb: "to have" },
		    set: { unit: "items", verb: "to have" },
		    map: { unit: "entries", verb: "to have" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "input",
		    email: "email address",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO datetime",
		    date: "ISO date",
		    time: "ISO time",
		    duration: "ISO duration",
		    ipv4: "IPv4 address",
		    ipv6: "IPv6 address",
		    mac: "MAC address",
		    cidrv4: "IPv4 range",
		    cidrv6: "IPv6 range",
		    base64: "base64-encoded string",
		    base64url: "base64url-encoded string",
		    json_string: "JSON string",
		    e164: "E.164 number",
		    jwt: "JWT",
		    template_literal: "input"
		  };
		  const TypeDictionary = {
		    // Compatibility: "nan" -> "NaN" for display
		    nan: "NaN"
		    // All other type names omitted - they fall back to raw values via ?? operator
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        return `Invalid input: expected ${expected}, received ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
		        return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
		        return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `Invalid string: must start with "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `Invalid string: must end with "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Invalid string: must include "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Invalid string: must match pattern ${_issue.pattern}`;
		        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Invalid number: must be a multiple of ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Invalid key in ${issue2.origin}`;
		      case "invalid_union":
		        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
		          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
		          return `Invalid discriminator value. Expected ${opts}`;
		        }
		        return "Invalid input";
		      case "invalid_element":
		        return `Invalid value in ${issue2.origin}`;
		      default:
		        return `Invalid input`;
		    }
		  };
		};
		function en_default() {
		  return {
		    localeError: error10()
		  };
		}

		// node_modules/zod/v4/locales/eo.js
		var error11 = () => {
		  const Sizable = {
		    string: { unit: "karaktrojn", verb: "havi" },
		    file: { unit: "bajtojn", verb: "havi" },
		    array: { unit: "elementojn", verb: "havi" },
		    set: { unit: "elementojn", verb: "havi" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "enigo",
		    email: "retadreso",
		    url: "URL",
		    emoji: "emo\u011Dio",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO-datotempo",
		    date: "ISO-dato",
		    time: "ISO-tempo",
		    duration: "ISO-da\u016Dro",
		    ipv4: "IPv4-adreso",
		    ipv6: "IPv6-adreso",
		    cidrv4: "IPv4-rango",
		    cidrv6: "IPv6-rango",
		    base64: "64-ume kodita karaktraro",
		    base64url: "URL-64-ume kodita karaktraro",
		    json_string: "JSON-karaktraro",
		    e164: "E.164-nombro",
		    jwt: "JWT",
		    template_literal: "enigo"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "nombro",
		    array: "tabelo",
		    null: "senvalora"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Nevalida enigo: atendi\u011Dis instanceof ${issue2.expected}, ricevi\u011Dis ${received}`;
		        }
		        return `Nevalida enigo: atendi\u011Dis ${expected}, ricevi\u011Dis ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Nevalida enigo: atendi\u011Dis ${stringifyPrimitive(issue2.values[0])}`;
		        return `Nevalida opcio: atendi\u011Dis unu el ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
		        return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Nevalida karaktraro: devas komenci\u011Di per "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Nevalida karaktraro: devas fini\u011Di per "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
		        return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} \u015Dlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Nevalida \u015Dlosilo en ${issue2.origin}`;
		      case "invalid_union":
		        return "Nevalida enigo";
		      case "invalid_element":
		        return `Nevalida valoro en ${issue2.origin}`;
		      default:
		        return `Nevalida enigo`;
		    }
		  };
		};
		function eo_default() {
		  return {
		    localeError: error11()
		  };
		}

		// node_modules/zod/v4/locales/es.js
		var error12 = () => {
		  const Sizable = {
		    string: { unit: "caracteres", verb: "tener" },
		    file: { unit: "bytes", verb: "tener" },
		    array: { unit: "elementos", verb: "tener" },
		    set: { unit: "elementos", verb: "tener" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "entrada",
		    email: "direcci\xF3n de correo electr\xF3nico",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "fecha y hora ISO",
		    date: "fecha ISO",
		    time: "hora ISO",
		    duration: "duraci\xF3n ISO",
		    ipv4: "direcci\xF3n IPv4",
		    ipv6: "direcci\xF3n IPv6",
		    cidrv4: "rango IPv4",
		    cidrv6: "rango IPv6",
		    base64: "cadena codificada en base64",
		    base64url: "URL codificada en base64",
		    json_string: "cadena JSON",
		    e164: "n\xFAmero E.164",
		    jwt: "JWT",
		    template_literal: "entrada"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    string: "texto",
		    number: "n\xFAmero",
		    boolean: "booleano",
		    array: "arreglo",
		    object: "objeto",
		    set: "conjunto",
		    file: "archivo",
		    date: "fecha",
		    bigint: "n\xFAmero grande",
		    symbol: "s\xEDmbolo",
		    undefined: "indefinido",
		    null: "nulo",
		    function: "funci\xF3n",
		    map: "mapa",
		    record: "registro",
		    tuple: "tupla",
		    enum: "enumeraci\xF3n",
		    union: "uni\xF3n",
		    literal: "literal",
		    promise: "promesa",
		    void: "vac\xEDo",
		    never: "nunca",
		    unknown: "desconocido",
		    any: "cualquiera"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Entrada inv\xE1lida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
		        }
		        return `Entrada inv\xE1lida: se esperaba ${expected}, recibido ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Entrada inv\xE1lida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
		        return `Opci\xF3n inv\xE1lida: se esperaba una de ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
		        if (sizing)
		          return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
		        return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
		        if (sizing) {
		          return `Demasiado peque\xF1o: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Demasiado peque\xF1o: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Cadena inv\xE1lida: debe comenzar con "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Cadena inv\xE1lida: debe terminar en "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Cadena inv\xE1lida: debe incluir "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${_issue.pattern}`;
		        return `Inv\xE1lido ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Llave inv\xE1lida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
		      case "invalid_union":
		        return "Entrada inv\xE1lida";
		      case "invalid_element":
		        return `Valor inv\xE1lido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
		      default:
		        return `Entrada inv\xE1lida`;
		    }
		  };
		};
		function es_default() {
		  return {
		    localeError: error12()
		  };
		}

		// node_modules/zod/v4/locales/fa.js
		var error13 = () => {
		  const Sizable = {
		    string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
		    file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
		    array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
		    set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0648\u0631\u0648\u062F\u06CC",
		    email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
		    url: "URL",
		    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
		    date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
		    time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
		    duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
		    ipv4: "IPv4 \u0622\u062F\u0631\u0633",
		    ipv6: "IPv6 \u0622\u062F\u0631\u0633",
		    cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
		    cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
		    base64: "base64-encoded \u0631\u0634\u062A\u0647",
		    base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
		    json_string: "JSON \u0631\u0634\u062A\u0647",
		    e164: "E.164 \u0639\u062F\u062F",
		    jwt: "JWT",
		    template_literal: "\u0648\u0631\u0648\u062F\u06CC"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0639\u062F\u062F",
		    array: "\u0622\u0631\u0627\u06CC\u0647"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${issue2.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
		        }
		        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1) {
		          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${stringifyPrimitive(issue2.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
		        }
		        return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${joinValues(issue2.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F`;
		        }
		        return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0628\u0627\u0634\u062F`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0628\u0627\u0634\u062F`;
		        }
		        return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0628\u0627\u0634\u062F`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
		        }
		        if (_issue.format === "ends_with") {
		          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
		        }
		        if (_issue.format === "includes") {
		          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${_issue.includes}" \u0628\u0627\u0634\u062F`;
		        }
		        if (_issue.format === "regex") {
		          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${_issue.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
		        }
		        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
		      }
		      case "not_multiple_of":
		        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${issue2.divisor} \u0628\u0627\u0634\u062F`;
		      case "unrecognized_keys":
		        return `\u06A9\u0644\u06CC\u062F${issue2.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${issue2.origin}`;
		      case "invalid_union":
		        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
		      case "invalid_element":
		        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${issue2.origin}`;
		      default:
		        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
		    }
		  };
		};
		function fa_default() {
		  return {
		    localeError: error13()
		  };
		}

		// node_modules/zod/v4/locales/fi.js
		var error14 = () => {
		  const Sizable = {
		    string: { unit: "merkki\xE4", subject: "merkkijonon" },
		    file: { unit: "tavua", subject: "tiedoston" },
		    array: { unit: "alkiota", subject: "listan" },
		    set: { unit: "alkiota", subject: "joukon" },
		    number: { unit: "", subject: "luvun" },
		    bigint: { unit: "", subject: "suuren kokonaisluvun" },
		    int: { unit: "", subject: "kokonaisluvun" },
		    date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "s\xE4\xE4nn\xF6llinen lauseke",
		    email: "s\xE4hk\xF6postiosoite",
		    url: "URL-osoite",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO-aikaleima",
		    date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
		    time: "ISO-aika",
		    duration: "ISO-kesto",
		    ipv4: "IPv4-osoite",
		    ipv6: "IPv6-osoite",
		    cidrv4: "IPv4-alue",
		    cidrv6: "IPv6-alue",
		    base64: "base64-koodattu merkkijono",
		    base64url: "base64url-koodattu merkkijono",
		    json_string: "JSON-merkkijono",
		    e164: "E.164-luku",
		    jwt: "JWT",
		    template_literal: "templaattimerkkijono"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
		        }
		        return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Virheellinen sy\xF6te: t\xE4ytyy olla ${stringifyPrimitive(issue2.values[0])}`;
		        return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Liian suuri: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
		        }
		        return `Liian suuri: arvon t\xE4ytyy olla ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Liian pieni: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
		        }
		        return `Liian pieni: arvon t\xE4ytyy olla ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${_issue.includes}"`;
		        if (_issue.format === "regex") {
		          return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${_issue.pattern}`;
		        }
		        return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Virheellinen luku: t\xE4ytyy olla luvun ${issue2.divisor} monikerta`;
		      case "unrecognized_keys":
		        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return "Virheellinen avain tietueessa";
		      case "invalid_union":
		        return "Virheellinen unioni";
		      case "invalid_element":
		        return "Virheellinen arvo joukossa";
		      default:
		        return `Virheellinen sy\xF6te`;
		    }
		  };
		};
		function fi_default() {
		  return {
		    localeError: error14()
		  };
		}

		// node_modules/zod/v4/locales/fr.js
		var error15 = () => {
		  const Sizable = {
		    string: { unit: "caract\xE8res", verb: "avoir" },
		    file: { unit: "octets", verb: "avoir" },
		    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
		    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "entr\xE9e",
		    email: "adresse e-mail",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "date et heure ISO",
		    date: "date ISO",
		    time: "heure ISO",
		    duration: "dur\xE9e ISO",
		    ipv4: "adresse IPv4",
		    ipv6: "adresse IPv6",
		    cidrv4: "plage IPv4",
		    cidrv6: "plage IPv6",
		    base64: "cha\xEEne encod\xE9e en base64",
		    base64url: "cha\xEEne encod\xE9e en base64url",
		    json_string: "cha\xEEne JSON",
		    e164: "num\xE9ro E.164",
		    jwt: "JWT",
		    template_literal: "entr\xE9e"
		  };
		  const TypeDictionary = {
		    string: "cha\xEEne",
		    number: "nombre",
		    int: "entier",
		    boolean: "bool\xE9en",
		    bigint: "grand entier",
		    symbol: "symbole",
		    undefined: "ind\xE9fini",
		    null: "null",
		    never: "jamais",
		    void: "vide",
		    date: "date",
		    array: "tableau",
		    object: "objet",
		    tuple: "tuple",
		    record: "enregistrement",
		    map: "carte",
		    set: "ensemble",
		    file: "fichier",
		    nonoptional: "non-optionnel",
		    nan: "NaN",
		    function: "fonction"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Entr\xE9e invalide : instanceof ${issue2.expected} attendu, ${received} re\xE7u`;
		        }
		        return `Entr\xE9e invalide : ${expected} attendu, ${received} re\xE7u`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Entr\xE9e invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
		        return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xE9l\xE9ment(s)"}`;
		        return `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit \xEAtre ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        return `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit \xEAtre ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${_issue.pattern}`;
		        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
		      }
		      case "not_multiple_of":
		        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Cl\xE9 invalide dans ${issue2.origin}`;
		      case "invalid_union":
		        return "Entr\xE9e invalide";
		      case "invalid_element":
		        return `Valeur invalide dans ${issue2.origin}`;
		      default:
		        return `Entr\xE9e invalide`;
		    }
		  };
		};
		function fr_default() {
		  return {
		    localeError: error15()
		  };
		}

		// node_modules/zod/v4/locales/fr-CA.js
		var error16 = () => {
		  const Sizable = {
		    string: { unit: "caract\xE8res", verb: "avoir" },
		    file: { unit: "octets", verb: "avoir" },
		    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
		    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "entr\xE9e",
		    email: "adresse courriel",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "date-heure ISO",
		    date: "date ISO",
		    time: "heure ISO",
		    duration: "dur\xE9e ISO",
		    ipv4: "adresse IPv4",
		    ipv6: "adresse IPv6",
		    cidrv4: "plage IPv4",
		    cidrv6: "plage IPv6",
		    base64: "cha\xEEne encod\xE9e en base64",
		    base64url: "cha\xEEne encod\xE9e en base64url",
		    json_string: "cha\xEEne JSON",
		    e164: "num\xE9ro E.164",
		    jwt: "JWT",
		    template_literal: "entr\xE9e"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Entr\xE9e invalide : attendu instanceof ${issue2.expected}, re\xE7u ${received}`;
		        }
		        return `Entr\xE9e invalide : attendu ${expected}, re\xE7u ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Entr\xE9e invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
		        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "\u2264" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
		        return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? "\u2265" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Cha\xEEne invalide : doit correspondre au motif ${_issue.pattern}`;
		        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
		      }
		      case "not_multiple_of":
		        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Cl\xE9 invalide dans ${issue2.origin}`;
		      case "invalid_union":
		        return "Entr\xE9e invalide";
		      case "invalid_element":
		        return `Valeur invalide dans ${issue2.origin}`;
		      default:
		        return `Entr\xE9e invalide`;
		    }
		  };
		};
		function fr_CA_default() {
		  return {
		    localeError: error16()
		  };
		}

		// node_modules/zod/v4/locales/he.js
		var error17 = () => {
		  const TypeNames = {
		    string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" },
		    number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" },
		    boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" },
		    bigint: { label: "BigInt", gender: "m" },
		    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" },
		    array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" },
		    object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" },
		    null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" },
		    undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" },
		    symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" },
		    function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" },
		    map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" },
		    set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" },
		    file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" },
		    promise: { label: "Promise", gender: "m" },
		    NaN: { label: "NaN", gender: "m" },
		    unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" },
		    value: { label: "\u05E2\u05E8\u05DA", gender: "m" }
		  };
		  const Sizable = {
		    string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" },
		    file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
		    array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
		    set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
		    number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }
		    // no unit
		  };
		  const typeEntry = (t) => t ? TypeNames[t] : void 0;
		  const typeLabel = (t) => {
		    const e = typeEntry(t);
		    if (e)
		      return e.label;
		    return t ?? TypeNames.unknown.label;
		  };
		  const withDefinite = (t) => `\u05D4${typeLabel(t)}`;
		  const verbFor = (t) => {
		    const e = typeEntry(t);
		    const gender = e?.gender ?? "m";
		    return gender === "f" ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA";
		  };
		  const getSizing = (origin) => {
		    if (!origin)
		      return null;
		    return Sizable[origin] ?? null;
		  };
		  const FormatDictionary = {
		    regex: { label: "\u05E7\u05DC\u05D8", gender: "m" },
		    email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" },
		    url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" },
		    emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" },
		    uuid: { label: "UUID", gender: "m" },
		    nanoid: { label: "nanoid", gender: "m" },
		    guid: { label: "GUID", gender: "m" },
		    cuid: { label: "cuid", gender: "m" },
		    cuid2: { label: "cuid2", gender: "m" },
		    ulid: { label: "ULID", gender: "m" },
		    xid: { label: "XID", gender: "m" },
		    ksuid: { label: "KSUID", gender: "m" },
		    datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" },
		    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" },
		    time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" },
		    duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" },
		    ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" },
		    ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" },
		    cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" },
		    cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" },
		    base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" },
		    base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" },
		    json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" },
		    e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" },
		    jwt: { label: "JWT", gender: "m" },
		    ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
		    includes: { label: "\u05E7\u05DC\u05D8", gender: "m" },
		    lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" },
		    starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
		    uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expectedKey = issue2.expected;
		        const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${issue2.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
		        }
		        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
		      }
		      case "invalid_value": {
		        if (issue2.values.length === 1) {
		          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${stringifyPrimitive(issue2.values[0])}`;
		        }
		        const stringified = issue2.values.map((v) => stringifyPrimitive(v));
		        if (issue2.values.length === 2) {
		          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${stringified[0]} \u05D0\u05D5 ${stringified[1]}`;
		        }
		        const lastValue = stringified[stringified.length - 1];
		        const restValues = stringified.slice(0, -1).join(", ");
		        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${restValues} \u05D0\u05D5 ${lastValue}`;
		      }
		      case "too_big": {
		        const sizing = getSizing(issue2.origin);
		        const subject = withDefinite(issue2.origin ?? "value");
		        if (issue2.origin === "string") {
		          return `${sizing?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
		        }
		        if (issue2.origin === "number") {
		          const comparison = issue2.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${issue2.maximum}`;
		          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
		        }
		        if (issue2.origin === "array" || issue2.origin === "set") {
		          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
		          const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${issue2.maximum} ${sizing?.unit ?? ""}`;
		          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
		        }
		        const adj = issue2.inclusive ? "<=" : "<";
		        const be = verbFor(issue2.origin ?? "value");
		        if (sizing?.unit) {
		          return `${sizing.longLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
		        }
		        return `${sizing?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const sizing = getSizing(issue2.origin);
		        const subject = withDefinite(issue2.origin ?? "value");
		        if (issue2.origin === "string") {
		          return `${sizing?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
		        }
		        if (issue2.origin === "number") {
		          const comparison = issue2.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${issue2.minimum}`;
		          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
		        }
		        if (issue2.origin === "array" || issue2.origin === "set") {
		          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
		          if (issue2.minimum === 1 && issue2.inclusive) {
		            const singularPhrase = issue2.origin === "set" ? "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3" : "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3";
		            return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${singularPhrase}`;
		          }
		          const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${issue2.minimum} ${sizing?.unit ?? ""}`;
		          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
		        }
		        const adj = issue2.inclusive ? ">=" : ">";
		        const be = verbFor(issue2.origin ?? "value");
		        if (sizing?.unit) {
		          return `${sizing.shortLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `${sizing?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${_issue.pattern}`;
		        const nounEntry = FormatDictionary[_issue.format];
		        const noun = nounEntry?.label ?? _issue.format;
		        const gender = nounEntry?.gender ?? "m";
		        const adjective = gender === "f" ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF";
		        return `${noun} \u05DC\u05D0 ${adjective}`;
		      }
		      case "not_multiple_of":
		        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `\u05DE\u05E4\u05EA\u05D7${issue2.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${issue2.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key": {
		        return `\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8`;
		      }
		      case "invalid_union":
		        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
		      case "invalid_element": {
		        const place = withDefinite(issue2.origin ?? "array");
		        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${place}`;
		      }
		      default:
		        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
		    }
		  };
		};
		function he_default() {
		  return {
		    localeError: error17()
		  };
		}

		// node_modules/zod/v4/locales/hr.js
		var error18 = () => {
		  const Sizable = {
		    string: { unit: "znakova", verb: "imati" },
		    file: { unit: "bajtova", verb: "imati" },
		    array: { unit: "stavki", verb: "imati" },
		    set: { unit: "stavki", verb: "imati" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "unos",
		    email: "email adresa",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO datum i vrijeme",
		    date: "ISO datum",
		    time: "ISO vrijeme",
		    duration: "ISO trajanje",
		    ipv4: "IPv4 adresa",
		    ipv6: "IPv6 adresa",
		    cidrv4: "IPv4 raspon",
		    cidrv6: "IPv6 raspon",
		    base64: "base64 kodirani tekst",
		    base64url: "base64url kodirani tekst",
		    json_string: "JSON tekst",
		    e164: "E.164 broj",
		    jwt: "JWT",
		    template_literal: "unos"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    string: "tekst",
		    number: "broj",
		    boolean: "boolean",
		    array: "niz",
		    object: "objekt",
		    set: "skup",
		    file: "datoteka",
		    date: "datum",
		    bigint: "bigint",
		    symbol: "simbol",
		    undefined: "undefined",
		    null: "null",
		    function: "funkcija",
		    map: "mapa"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Neispravan unos: o\u010Dekuje se instanceof ${issue2.expected}, a primljeno je ${received}`;
		        }
		        return `Neispravan unos: o\u010Dekuje se ${expected}, a primljeno je ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Neispravna vrijednost: o\u010Dekivano ${stringifyPrimitive(issue2.values[0])}`;
		        return `Neispravna opcija: o\u010Dekivano jedno od ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
		        if (sizing)
		          return `Preveliko: o\u010Dekivano da ${origin ?? "vrijednost"} ima ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemenata"}`;
		        return `Preveliko: o\u010Dekivano da ${origin ?? "vrijednost"} bude ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
		        if (sizing) {
		          return `Premalo: o\u010Dekivano da ${origin} ima ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Premalo: o\u010Dekivano da ${origin} bude ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Neispravan tekst: mora zapo\u010Dinjati s "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Neispravan tekst: mora zavr\u0161avati s "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Neispravan tekst: mora sadr\u017Eavati "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}`;
		        return `Neispravna ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Neispravan broj: mora biti vi\u0161ekratnik od ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Neprepoznat${issue2.keys.length > 1 ? "i klju\u010Devi" : " klju\u010D"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Neispravan klju\u010D u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
		      case "invalid_union":
		        return "Neispravan unos";
		      case "invalid_element":
		        return `Neispravna vrijednost u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
		      default:
		        return `Neispravan unos`;
		    }
		  };
		};
		function hr_default() {
		  return {
		    localeError: error18()
		  };
		}

		// node_modules/zod/v4/locales/hu.js
		var error19 = () => {
		  const Sizable = {
		    string: { unit: "karakter", verb: "legyen" },
		    file: { unit: "byte", verb: "legyen" },
		    array: { unit: "elem", verb: "legyen" },
		    set: { unit: "elem", verb: "legyen" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "bemenet",
		    email: "email c\xEDm",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO id\u0151b\xE9lyeg",
		    date: "ISO d\xE1tum",
		    time: "ISO id\u0151",
		    duration: "ISO id\u0151intervallum",
		    ipv4: "IPv4 c\xEDm",
		    ipv6: "IPv6 c\xEDm",
		    cidrv4: "IPv4 tartom\xE1ny",
		    cidrv6: "IPv6 tartom\xE1ny",
		    base64: "base64-k\xF3dolt string",
		    base64url: "base64url-k\xF3dolt string",
		    json_string: "JSON string",
		    e164: "E.164 sz\xE1m",
		    jwt: "JWT",
		    template_literal: "bemenet"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "sz\xE1m",
		    array: "t\xF6mb"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${issue2.expected}, a kapott \xE9rt\xE9k ${received}`;
		        }
		        return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${expected}, a kapott \xE9rt\xE9k ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${stringifyPrimitive(issue2.values[0])}`;
		        return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `T\xFAl nagy: ${issue2.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
		        return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${issue2.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} m\xE9rete t\xFAl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} t\xFAl kicsi ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\xC9rv\xE9nytelen string: "${_issue.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
		        if (_issue.format === "ends_with")
		          return `\xC9rv\xE9nytelen string: "${_issue.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
		        if (_issue.format === "includes")
		          return `\xC9rv\xE9nytelen string: "${_issue.includes}" \xE9rt\xE9ket kell tartalmaznia`;
		        if (_issue.format === "regex")
		          return `\xC9rv\xE9nytelen string: ${_issue.pattern} mint\xE1nak kell megfelelnie`;
		        return `\xC9rv\xE9nytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\xC9rv\xE9nytelen sz\xE1m: ${issue2.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
		      case "unrecognized_keys":
		        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\xC9rv\xE9nytelen kulcs ${issue2.origin}`;
		      case "invalid_union":
		        return "\xC9rv\xE9nytelen bemenet";
		      case "invalid_element":
		        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${issue2.origin}`;
		      default:
		        return `\xC9rv\xE9nytelen bemenet`;
		    }
		  };
		};
		function hu_default() {
		  return {
		    localeError: error19()
		  };
		}

		// node_modules/zod/v4/locales/hy.js
		function getArmenianPlural(count, one, many) {
		  return Math.abs(count) === 1 ? one : many;
		}
		function withDefiniteArticle(word) {
		  if (!word)
		    return "";
		  const vowels = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"];
		  const lastChar = word[word.length - 1];
		  return word + (vowels.includes(lastChar) ? "\u0576" : "\u0568");
		}
		var error20 = () => {
		  const Sizable = {
		    string: {
		      unit: {
		        one: "\u0576\u0577\u0561\u0576",
		        many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580"
		      },
		      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
		    },
		    file: {
		      unit: {
		        one: "\u0562\u0561\u0575\u0569",
		        many: "\u0562\u0561\u0575\u0569\u0565\u0580"
		      },
		      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
		    },
		    array: {
		      unit: {
		        one: "\u057F\u0561\u0580\u0580",
		        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
		      },
		      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
		    },
		    set: {
		      unit: {
		        one: "\u057F\u0561\u0580\u0580",
		        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
		      },
		      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
		    }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0574\u0578\u0582\u057F\u0584",
		    email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565",
		    url: "URL",
		    emoji: "\u0567\u0574\u0578\u057B\u056B",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574",
		    date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E",
		    time: "ISO \u056A\u0561\u0574",
		    duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
		    ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565",
		    ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565",
		    cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
		    cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
		    base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
		    base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
		    json_string: "JSON \u057F\u0578\u0572",
		    e164: "E.164 \u0570\u0561\u0574\u0561\u0580",
		    jwt: "JWT",
		    template_literal: "\u0574\u0578\u0582\u057F\u0584"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0569\u056B\u057E",
		    array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${issue2.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
		        }
		        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${stringifyPrimitive(issue2.values[1])}`;
		        return `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          const maxValue = Number(issue2.maximum);
		          const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
		          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.maximum.toString()} ${unit}`;
		        }
		        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          const minValue = Number(issue2.minimum);
		          const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
		          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.minimum.toString()} ${unit}`;
		        }
		        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056C\u056B\u0576\u056B ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${_issue.prefix}"-\u0578\u057E`;
		        if (_issue.format === "ends_with")
		          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${_issue.suffix}"-\u0578\u057E`;
		        if (_issue.format === "includes")
		          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${_issue.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576`;
		        return `\u054D\u056D\u0561\u056C ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${issue2.divisor}-\u056B`;
		      case "unrecognized_keys":
		        return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${issue2.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
		      case "invalid_union":
		        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
		      case "invalid_element":
		        return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
		      default:
		        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574`;
		    }
		  };
		};
		function hy_default() {
		  return {
		    localeError: error20()
		  };
		}

		// node_modules/zod/v4/locales/id.js
		var error21 = () => {
		  const Sizable = {
		    string: { unit: "karakter", verb: "memiliki" },
		    file: { unit: "byte", verb: "memiliki" },
		    array: { unit: "item", verb: "memiliki" },
		    set: { unit: "item", verb: "memiliki" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "input",
		    email: "alamat email",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "tanggal dan waktu format ISO",
		    date: "tanggal format ISO",
		    time: "jam format ISO",
		    duration: "durasi format ISO",
		    ipv4: "alamat IPv4",
		    ipv6: "alamat IPv6",
		    cidrv4: "rentang alamat IPv4",
		    cidrv6: "rentang alamat IPv6",
		    base64: "string dengan enkode base64",
		    base64url: "string dengan enkode base64url",
		    json_string: "string JSON",
		    e164: "angka E.164",
		    jwt: "JWT",
		    template_literal: "input"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
		        }
		        return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
		        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
		        return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
		        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
		      }
		      case "not_multiple_of":
		        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Kunci tidak valid di ${issue2.origin}`;
		      case "invalid_union":
		        return "Input tidak valid";
		      case "invalid_element":
		        return `Nilai tidak valid di ${issue2.origin}`;
		      default:
		        return `Input tidak valid`;
		    }
		  };
		};
		function id_default() {
		  return {
		    localeError: error21()
		  };
		}

		// node_modules/zod/v4/locales/is.js
		var error22 = () => {
		  const Sizable = {
		    string: { unit: "stafi", verb: "a\xF0 hafa" },
		    file: { unit: "b\xE6ti", verb: "a\xF0 hafa" },
		    array: { unit: "hluti", verb: "a\xF0 hafa" },
		    set: { unit: "hluti", verb: "a\xF0 hafa" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "gildi",
		    email: "netfang",
		    url: "vefsl\xF3\xF0",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO dagsetning og t\xEDmi",
		    date: "ISO dagsetning",
		    time: "ISO t\xEDmi",
		    duration: "ISO t\xEDmalengd",
		    ipv4: "IPv4 address",
		    ipv6: "IPv6 address",
		    cidrv4: "IPv4 range",
		    cidrv6: "IPv6 range",
		    base64: "base64-encoded strengur",
		    base64url: "base64url-encoded strengur",
		    json_string: "JSON strengur",
		    e164: "E.164 t\xF6lugildi",
		    jwt: "JWT",
		    template_literal: "gildi"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "n\xFAmer",
		    array: "fylki"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera instanceof ${issue2.expected}`;
		        }
		        return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera ${expected}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Rangt gildi: gert r\xE1\xF0 fyrir ${stringifyPrimitive(issue2.values[0])}`;
		        return `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
		        return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} s\xE9 ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} s\xE9 ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${_issue.pattern}`;
		        return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `\xD3\xFEekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Rangur lykill \xED ${issue2.origin}`;
		      case "invalid_union":
		        return "Rangt gildi";
		      case "invalid_element":
		        return `Rangt gildi \xED ${issue2.origin}`;
		      default:
		        return `Rangt gildi`;
		    }
		  };
		};
		function is_default() {
		  return {
		    localeError: error22()
		  };
		}

		// node_modules/zod/v4/locales/it.js
		var error23 = () => {
		  const Sizable = {
		    string: { unit: "caratteri", verb: "avere" },
		    file: { unit: "byte", verb: "avere" },
		    array: { unit: "elementi", verb: "avere" },
		    set: { unit: "elementi", verb: "avere" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "input",
		    email: "indirizzo email",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "data e ora ISO",
		    date: "data ISO",
		    time: "ora ISO",
		    duration: "durata ISO",
		    ipv4: "indirizzo IPv4",
		    ipv6: "indirizzo IPv6",
		    cidrv4: "intervallo IPv4",
		    cidrv6: "intervallo IPv6",
		    base64: "stringa codificata in base64",
		    base64url: "URL codificata in base64",
		    json_string: "stringa JSON",
		    e164: "numero E.164",
		    jwt: "JWT",
		    template_literal: "input"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "numero",
		    array: "vettore"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
		        }
		        return `Input non valido: atteso ${expected}, ricevuto ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
		        return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
		        return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Stringa non valida: deve includere "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
		        return `Input non valido: ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Chiave non valida in ${issue2.origin}`;
		      case "invalid_union":
		        return "Input non valido";
		      case "invalid_element":
		        return `Valore non valido in ${issue2.origin}`;
		      default:
		        return `Input non valido`;
		    }
		  };
		};
		function it_default() {
		  return {
		    localeError: error23()
		  };
		}

		// node_modules/zod/v4/locales/ja.js
		var error24 = () => {
		  const Sizable = {
		    string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" },
		    file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" },
		    array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" },
		    set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u5165\u529B\u5024",
		    email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
		    url: "URL",
		    emoji: "\u7D75\u6587\u5B57",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO\u65E5\u6642",
		    date: "ISO\u65E5\u4ED8",
		    time: "ISO\u6642\u523B",
		    duration: "ISO\u671F\u9593",
		    ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9",
		    ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9",
		    cidrv4: "IPv4\u7BC4\u56F2",
		    cidrv6: "IPv6\u7BC4\u56F2",
		    base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
		    base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
		    json_string: "JSON\u6587\u5B57\u5217",
		    e164: "E.164\u756A\u53F7",
		    jwt: "JWT",
		    template_literal: "\u5165\u529B\u5024"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u6570\u5024",
		    array: "\u914D\u5217"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u7121\u52B9\u306A\u5165\u529B: instanceof ${issue2.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
		        }
		        return `\u7121\u52B9\u306A\u5165\u529B: ${expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u7121\u52B9\u306A\u5165\u529B: ${stringifyPrimitive(issue2.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
		        return `\u7121\u52B9\u306A\u9078\u629E: ${joinValues(issue2.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "\u4EE5\u4E0B\u3067\u3042\u308B" : "\u3088\u308A\u5C0F\u3055\u3044";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${sizing.unit ?? "\u8981\u7D20"}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		        return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? "\u4EE5\u4E0A\u3067\u3042\u308B" : "\u3088\u308A\u5927\u304D\u3044";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${sizing.unit}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		        return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		        if (_issue.format === "ends_with")
		          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		        if (_issue.format === "includes")
		          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		        if (_issue.format === "regex")
		          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${_issue.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		        return `\u7121\u52B9\u306A${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u7121\u52B9\u306A\u6570\u5024: ${issue2.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
		      case "unrecognized_keys":
		        return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${issue2.keys.length > 1 ? "\u7FA4" : ""}: ${joinValues(issue2.keys, "\u3001")}`;
		      case "invalid_key":
		        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
		      case "invalid_union":
		        return "\u7121\u52B9\u306A\u5165\u529B";
		      case "invalid_element":
		        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
		      default:
		        return `\u7121\u52B9\u306A\u5165\u529B`;
		    }
		  };
		};
		function ja_default() {
		  return {
		    localeError: error24()
		  };
		}

		// node_modules/zod/v4/locales/ka.js
		var error25 = () => {
		  const Sizable = {
		    string: { unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
		    file: { unit: "\u10D1\u10D0\u10D8\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
		    array: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
		    set: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0",
		    email: "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
		    url: "URL",
		    emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD",
		    date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8",
		    time: "\u10D3\u10E0\u10DD",
		    duration: "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0",
		    ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
		    ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
		    cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
		    cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
		    base64: "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10D5\u10D4\u10DA\u10D8",
		    base64url: "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10D5\u10D4\u10DA\u10D8",
		    json_string: "JSON \u10D5\u10D4\u10DA\u10D8",
		    e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8",
		    jwt: "JWT",
		    template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8",
		    string: "\u10D5\u10D4\u10DA\u10D8",
		    boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8",
		    function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0",
		    array: "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 instanceof ${issue2.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
		        }
		        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${joinValues(issue2.values, "|")}-\u10D3\u10D0\u10DC`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
		        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.prefix}"-\u10D8\u10D7`;
		        }
		        if (_issue.format === "ends_with")
		          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.suffix}"-\u10D8\u10D7`;
		        if (_issue.format === "includes")
		          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${_issue.includes}"-\u10E1`;
		        if (_issue.format === "regex")
		          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D4\u10DA\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${_issue.pattern}`;
		        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${issue2.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
		      case "unrecognized_keys":
		        return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${issue2.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${issue2.origin}-\u10E8\u10D8`;
		      case "invalid_union":
		        return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
		      case "invalid_element":
		        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${issue2.origin}-\u10E8\u10D8`;
		      default:
		        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0`;
		    }
		  };
		};
		function ka_default() {
		  return {
		    localeError: error25()
		  };
		}

		// node_modules/zod/v4/locales/km.js
		var error26 = () => {
		  const Sizable = {
		    string: { unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
		    file: { unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
		    array: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
		    set: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
		    email: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B",
		    url: "URL",
		    emoji: "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO",
		    date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO",
		    time: "\u1798\u17C9\u17C4\u1784 ISO",
		    duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO",
		    ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
		    ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
		    cidrv4: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
		    cidrv6: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
		    base64: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64",
		    base64url: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url",
		    json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON",
		    e164: "\u179B\u17C1\u1781 E.164",
		    jwt: "JWT",
		    template_literal: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u179B\u17C1\u1781",
		    array: "\u17A2\u17B6\u179A\u17C1 (Array)",
		    null: "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A instanceof ${issue2.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
		        }
		        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u1792\u17B6\u178F\u17BB"}`;
		        return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${_issue.pattern}`;
		        return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
		      case "invalid_union":
		        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
		      case "invalid_element":
		        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
		      default:
		        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
		    }
		  };
		};
		function km_default() {
		  return {
		    localeError: error26()
		  };
		}

		// node_modules/zod/v4/locales/kh.js
		function kh_default() {
		  return km_default();
		}

		// node_modules/zod/v4/locales/ko.js
		var error27 = () => {
		  const Sizable = {
		    string: { unit: "\uBB38\uC790", verb: "to have" },
		    file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" },
		    array: { unit: "\uAC1C", verb: "to have" },
		    set: { unit: "\uAC1C", verb: "to have" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\uC785\uB825",
		    email: "\uC774\uBA54\uC77C \uC8FC\uC18C",
		    url: "URL",
		    emoji: "\uC774\uBAA8\uC9C0",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04",
		    date: "ISO \uB0A0\uC9DC",
		    time: "ISO \uC2DC\uAC04",
		    duration: "ISO \uAE30\uAC04",
		    ipv4: "IPv4 \uC8FC\uC18C",
		    ipv6: "IPv6 \uC8FC\uC18C",
		    cidrv4: "IPv4 \uBC94\uC704",
		    cidrv6: "IPv6 \uBC94\uC704",
		    base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
		    base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
		    json_string: "JSON \uBB38\uC790\uC5F4",
		    e164: "E.164 \uBC88\uD638",
		    jwt: "JWT",
		    template_literal: "\uC785\uB825"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${issue2.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
		        }
		        return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${stringifyPrimitive(issue2.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
		        return `\uC798\uBABB\uB41C \uC635\uC158: ${joinValues(issue2.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC";
		        const suffix = adj === "\uBBF8\uB9CC" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
		        const sizing = getSizing(issue2.origin);
		        const unit = sizing?.unit ?? "\uC694\uC18C";
		        if (sizing)
		          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
		        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()} ${adj}${suffix}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC";
		        const suffix = adj === "\uC774\uC0C1" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
		        const sizing = getSizing(issue2.origin);
		        const unit = sizing?.unit ?? "\uC694\uC18C";
		        if (sizing) {
		          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
		        }
		        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()} ${adj}${suffix}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
		        }
		        if (_issue.format === "ends_with")
		          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
		        if (_issue.format === "includes")
		          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
		        if (_issue.format === "regex")
		          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${_issue.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
		        return `\uC798\uBABB\uB41C ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\uC798\uBABB\uB41C \uC22B\uC790: ${issue2.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
		      case "unrecognized_keys":
		        return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\uC798\uBABB\uB41C \uD0A4: ${issue2.origin}`;
		      case "invalid_union":
		        return `\uC798\uBABB\uB41C \uC785\uB825`;
		      case "invalid_element":
		        return `\uC798\uBABB\uB41C \uAC12: ${issue2.origin}`;
		      default:
		        return `\uC798\uBABB\uB41C \uC785\uB825`;
		    }
		  };
		};
		function ko_default() {
		  return {
		    localeError: error27()
		  };
		}

		// node_modules/zod/v4/locales/lt.js
		var capitalizeFirstCharacter = (text) => {
		  return text.charAt(0).toUpperCase() + text.slice(1);
		};
		function getUnitTypeFromNumber(number4) {
		  const abs = Math.abs(number4);
		  const last = abs % 10;
		  const last2 = abs % 100;
		  if (last2 >= 11 && last2 <= 19 || last === 0)
		    return "many";
		  if (last === 1)
		    return "one";
		  return "few";
		}
		var error28 = () => {
		  const Sizable = {
		    string: {
		      unit: {
		        one: "simbolis",
		        few: "simboliai",
		        many: "simboli\u0173"
		      },
		      verb: {
		        smaller: {
		          inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip",
		          notInclusive: "turi b\u016Bti trumpesn\u0117 kaip"
		        },
		        bigger: {
		          inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip",
		          notInclusive: "turi b\u016Bti ilgesn\u0117 kaip"
		        }
		      }
		    },
		    file: {
		      unit: {
		        one: "baitas",
		        few: "baitai",
		        many: "bait\u0173"
		      },
		      verb: {
		        smaller: {
		          inclusive: "turi b\u016Bti ne didesnis kaip",
		          notInclusive: "turi b\u016Bti ma\u017Eesnis kaip"
		        },
		        bigger: {
		          inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip",
		          notInclusive: "turi b\u016Bti didesnis kaip"
		        }
		      }
		    },
		    array: {
		      unit: {
		        one: "element\u0105",
		        few: "elementus",
		        many: "element\u0173"
		      },
		      verb: {
		        smaller: {
		          inclusive: "turi tur\u0117ti ne daugiau kaip",
		          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
		        },
		        bigger: {
		          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
		          notInclusive: "turi tur\u0117ti daugiau kaip"
		        }
		      }
		    },
		    set: {
		      unit: {
		        one: "element\u0105",
		        few: "elementus",
		        many: "element\u0173"
		      },
		      verb: {
		        smaller: {
		          inclusive: "turi tur\u0117ti ne daugiau kaip",
		          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
		        },
		        bigger: {
		          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
		          notInclusive: "turi tur\u0117ti daugiau kaip"
		        }
		      }
		    }
		  };
		  function getSizing(origin, unitType, inclusive, targetShouldBe) {
		    const result = Sizable[origin] ?? null;
		    if (result === null)
		      return result;
		    return {
		      unit: result.unit[unitType],
		      verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
		    };
		  }
		  const FormatDictionary = {
		    regex: "\u012Fvestis",
		    email: "el. pa\u0161to adresas",
		    url: "URL",
		    emoji: "jaustukas",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO data ir laikas",
		    date: "ISO data",
		    time: "ISO laikas",
		    duration: "ISO trukm\u0117",
		    ipv4: "IPv4 adresas",
		    ipv6: "IPv6 adresas",
		    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
		    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
		    base64: "base64 u\u017Ekoduota eilut\u0117",
		    base64url: "base64url u\u017Ekoduota eilut\u0117",
		    json_string: "JSON eilut\u0117",
		    e164: "E.164 numeris",
		    jwt: "JWT",
		    template_literal: "\u012Fvestis"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "skai\u010Dius",
		    bigint: "sveikasis skai\u010Dius",
		    string: "eilut\u0117",
		    boolean: "login\u0117 reik\u0161m\u0117",
		    undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117",
		    function: "funkcija",
		    symbol: "simbolis",
		    array: "masyvas",
		    object: "objektas",
		    null: "nulin\u0117 reik\u0161m\u0117"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Gautas tipas ${received}, o tik\u0117tasi - instanceof ${issue2.expected}`;
		        }
		        return `Gautas tipas ${received}, o tik\u0117tasi - ${expected}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Privalo b\u016Bti ${stringifyPrimitive(issue2.values[0])}`;
		        return `Privalo b\u016Bti vienas i\u0161 ${joinValues(issue2.values, "|")} pasirinkim\u0173`;
		      case "too_big": {
		        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
		        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
		        if (sizing?.verb)
		          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "element\u0173"}`;
		        const adj = issue2.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
		        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
		      }
		      case "too_small": {
		        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
		        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
		        if (sizing?.verb)
		          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "element\u0173"}`;
		        const adj = issue2.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
		        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `Eilut\u0117 privalo prasid\u0117ti "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `Eilut\u0117 privalo pasibaigti "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Eilut\u0117 privalo \u012Ftraukti "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Eilut\u0117 privalo atitikti ${_issue.pattern}`;
		        return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Skai\u010Dius privalo b\u016Bti ${issue2.divisor} kartotinis.`;
		      case "unrecognized_keys":
		        return `Neatpa\u017Eint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return "Rastas klaidingas raktas";
		      case "invalid_union":
		        return "Klaidinga \u012Fvestis";
		      case "invalid_element": {
		        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
		        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
		      }
		      default:
		        return "Klaidinga \u012Fvestis";
		    }
		  };
		};
		function lt_default() {
		  return {
		    localeError: error28()
		  };
		}

		// node_modules/zod/v4/locales/mk.js
		var error29 = () => {
		  const Sizable = {
		    string: { unit: "\u0437\u043D\u0430\u0446\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
		    file: { unit: "\u0431\u0430\u0458\u0442\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
		    array: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
		    set: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0432\u043D\u0435\u0441",
		    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430",
		    url: "URL",
		    emoji: "\u0435\u043C\u043E\u045F\u0438",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435",
		    date: "ISO \u0434\u0430\u0442\u0443\u043C",
		    time: "ISO \u0432\u0440\u0435\u043C\u0435",
		    duration: "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435",
		    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430",
		    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430",
		    cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433",
		    cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433",
		    base64: "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
		    base64url: "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
		    json_string: "JSON \u043D\u0438\u0437\u0430",
		    e164: "E.164 \u0431\u0440\u043E\u0458",
		    jwt: "JWT",
		    template_literal: "\u0432\u043D\u0435\u0441"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0431\u0440\u043E\u0458",
		    array: "\u043D\u0438\u0437\u0430"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 instanceof ${issue2.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
		        }
		        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}`;
		        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${_issue.pattern}`;
		        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `${issue2.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${issue2.origin}`;
		      case "invalid_union":
		        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
		      case "invalid_element":
		        return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${issue2.origin}`;
		      default:
		        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441`;
		    }
		  };
		};
		function mk_default() {
		  return {
		    localeError: error29()
		  };
		}

		// node_modules/zod/v4/locales/ms.js
		var error30 = () => {
		  const Sizable = {
		    string: { unit: "aksara", verb: "mempunyai" },
		    file: { unit: "bait", verb: "mempunyai" },
		    array: { unit: "elemen", verb: "mempunyai" },
		    set: { unit: "elemen", verb: "mempunyai" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "input",
		    email: "alamat e-mel",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "tarikh masa ISO",
		    date: "tarikh ISO",
		    time: "masa ISO",
		    duration: "tempoh ISO",
		    ipv4: "alamat IPv4",
		    ipv6: "alamat IPv6",
		    cidrv4: "julat IPv4",
		    cidrv6: "julat IPv6",
		    base64: "string dikodkan base64",
		    base64url: "string dikodkan base64url",
		    json_string: "string JSON",
		    e164: "nombor E.164",
		    jwt: "JWT",
		    template_literal: "input"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "nombor"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
		        }
		        return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
		        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
		        return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
		        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
		      }
		      case "not_multiple_of":
		        return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Kunci tidak sah dalam ${issue2.origin}`;
		      case "invalid_union":
		        return "Input tidak sah";
		      case "invalid_element":
		        return `Nilai tidak sah dalam ${issue2.origin}`;
		      default:
		        return `Input tidak sah`;
		    }
		  };
		};
		function ms_default() {
		  return {
		    localeError: error30()
		  };
		}

		// node_modules/zod/v4/locales/nl.js
		var error31 = () => {
		  const Sizable = {
		    string: { unit: "tekens", verb: "heeft" },
		    file: { unit: "bytes", verb: "heeft" },
		    array: { unit: "elementen", verb: "heeft" },
		    set: { unit: "elementen", verb: "heeft" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "invoer",
		    email: "emailadres",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO datum en tijd",
		    date: "ISO datum",
		    time: "ISO tijd",
		    duration: "ISO duur",
		    ipv4: "IPv4-adres",
		    ipv6: "IPv6-adres",
		    cidrv4: "IPv4-bereik",
		    cidrv6: "IPv6-bereik",
		    base64: "base64-gecodeerde tekst",
		    base64url: "base64 URL-gecodeerde tekst",
		    json_string: "JSON string",
		    e164: "E.164-nummer",
		    jwt: "JWT",
		    template_literal: "invoer"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "getal"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
		        }
		        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
		        return `Ongeldige optie: verwacht \xE9\xE9n van ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
		        if (sizing)
		          return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
		        return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
		        if (sizing) {
		          return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
		        }
		        return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
		        }
		        if (_issue.format === "ends_with")
		          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
		        if (_issue.format === "includes")
		          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
		        if (_issue.format === "regex")
		          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
		        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
		      case "unrecognized_keys":
		        return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Ongeldige key in ${issue2.origin}`;
		      case "invalid_union":
		        return "Ongeldige invoer";
		      case "invalid_element":
		        return `Ongeldige waarde in ${issue2.origin}`;
		      default:
		        return `Ongeldige invoer`;
		    }
		  };
		};
		function nl_default() {
		  return {
		    localeError: error31()
		  };
		}

		// node_modules/zod/v4/locales/no.js
		var error32 = () => {
		  const Sizable = {
		    string: { unit: "tegn", verb: "\xE5 ha" },
		    file: { unit: "bytes", verb: "\xE5 ha" },
		    array: { unit: "elementer", verb: "\xE5 inneholde" },
		    set: { unit: "elementer", verb: "\xE5 inneholde" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "input",
		    email: "e-postadresse",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO dato- og klokkeslett",
		    date: "ISO-dato",
		    time: "ISO-klokkeslett",
		    duration: "ISO-varighet",
		    ipv4: "IPv4-omr\xE5de",
		    ipv6: "IPv6-omr\xE5de",
		    cidrv4: "IPv4-spekter",
		    cidrv6: "IPv6-spekter",
		    base64: "base64-enkodet streng",
		    base64url: "base64url-enkodet streng",
		    json_string: "JSON-streng",
		    e164: "E.164-nummer",
		    jwt: "JWT",
		    template_literal: "input"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "tall",
		    array: "liste"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
		        }
		        return `Ugyldig input: forventet ${expected}, fikk ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
		        return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
		        return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Ugyldig streng: m\xE5 starte med "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Ugyldig streng: m\xE5 ende med "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Ugyldig streng: m\xE5 inneholde "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${_issue.pattern}`;
		        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `${issue2.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Ugyldig n\xF8kkel i ${issue2.origin}`;
		      case "invalid_union":
		        return "Ugyldig input";
		      case "invalid_element":
		        return `Ugyldig verdi i ${issue2.origin}`;
		      default:
		        return `Ugyldig input`;
		    }
		  };
		};
		function no_default() {
		  return {
		    localeError: error32()
		  };
		}

		// node_modules/zod/v4/locales/ota.js
		var error33 = () => {
		  const Sizable = {
		    string: { unit: "harf", verb: "olmal\u0131d\u0131r" },
		    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
		    array: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
		    set: { unit: "unsur", verb: "olmal\u0131d\u0131r" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "giren",
		    email: "epostag\xE2h",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO heng\xE2m\u0131",
		    date: "ISO tarihi",
		    time: "ISO zaman\u0131",
		    duration: "ISO m\xFCddeti",
		    ipv4: "IPv4 ni\u015F\xE2n\u0131",
		    ipv6: "IPv6 ni\u015F\xE2n\u0131",
		    cidrv4: "IPv4 menzili",
		    cidrv6: "IPv6 menzili",
		    base64: "base64-\u015Fifreli metin",
		    base64url: "base64url-\u015Fifreli metin",
		    json_string: "JSON metin",
		    e164: "E.164 say\u0131s\u0131",
		    jwt: "JWT",
		    template_literal: "giren"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "numara",
		    array: "saf",
		    null: "gayb"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `F\xE2sit giren: umulan instanceof ${issue2.expected}, al\u0131nan ${received}`;
		        }
		        return `F\xE2sit giren: umulan ${expected}, al\u0131nan ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `F\xE2sit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
		        return `F\xE2sit tercih: m\xFBteberler ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmal\u0131yd\u0131.`;
		        return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmal\u0131yd\u0131.`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmal\u0131yd\u0131.`;
		        }
		        return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmal\u0131yd\u0131.`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `F\xE2sit metin: "${_issue.prefix}" ile ba\u015Flamal\u0131.`;
		        if (_issue.format === "ends_with")
		          return `F\xE2sit metin: "${_issue.suffix}" ile bitmeli.`;
		        if (_issue.format === "includes")
		          return `F\xE2sit metin: "${_issue.includes}" ihtiv\xE2 etmeli.`;
		        if (_issue.format === "regex")
		          return `F\xE2sit metin: ${_issue.pattern} nak\u015F\u0131na uymal\u0131.`;
		        return `F\xE2sit ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `F\xE2sit say\u0131: ${issue2.divisor} kat\u0131 olmal\u0131yd\u0131.`;
		      case "unrecognized_keys":
		        return `Tan\u0131nmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `${issue2.origin} i\xE7in tan\u0131nmayan anahtar var.`;
		      case "invalid_union":
		        return "Giren tan\u0131namad\u0131.";
		      case "invalid_element":
		        return `${issue2.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
		      default:
		        return `K\u0131ymet tan\u0131namad\u0131.`;
		    }
		  };
		};
		function ota_default() {
		  return {
		    localeError: error33()
		  };
		}

		// node_modules/zod/v4/locales/ps.js
		var error34 = () => {
		  const Sizable = {
		    string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
		    file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" },
		    array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
		    set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0648\u0631\u0648\u062F\u064A",
		    email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9",
		    url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644",
		    emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A",
		    date: "\u0646\u06D0\u067C\u0647",
		    time: "\u0648\u062E\u062A",
		    duration: "\u0645\u0648\u062F\u0647",
		    ipv4: "\u062F IPv4 \u067E\u062A\u0647",
		    ipv6: "\u062F IPv6 \u067E\u062A\u0647",
		    cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647",
		    cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647",
		    base64: "base64-encoded \u0645\u062A\u0646",
		    base64url: "base64url-encoded \u0645\u062A\u0646",
		    json_string: "JSON \u0645\u062A\u0646",
		    e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647",
		    jwt: "JWT",
		    template_literal: "\u0648\u0631\u0648\u062F\u064A"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0639\u062F\u062F",
		    array: "\u0627\u0631\u06D0"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${issue2.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
		        }
		        return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1) {
		          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${stringifyPrimitive(issue2.values[0])} \u0648\u0627\u06CC`;
		        }
		        return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${joinValues(issue2.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A`;
		        }
		        return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0648\u064A`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0648\u0644\u0631\u064A`;
		        }
		        return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0648\u064A`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
		        }
		        if (_issue.format === "ends_with") {
		          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
		        }
		        if (_issue.format === "includes") {
		          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${_issue.includes}" \u0648\u0644\u0631\u064A`;
		        }
		        if (_issue.format === "regex") {
		          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${_issue.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
		        }
		        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
		      }
		      case "not_multiple_of":
		        return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${issue2.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
		      case "unrecognized_keys":
		        return `\u0646\u0627\u0633\u0645 ${issue2.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
		      case "invalid_union":
		        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
		      case "invalid_element":
		        return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
		      default:
		        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
		    }
		  };
		};
		function ps_default() {
		  return {
		    localeError: error34()
		  };
		}

		// node_modules/zod/v4/locales/pl.js
		var error35 = () => {
		  const Sizable = {
		    string: { unit: "znak\xF3w", verb: "mie\u0107" },
		    file: { unit: "bajt\xF3w", verb: "mie\u0107" },
		    array: { unit: "element\xF3w", verb: "mie\u0107" },
		    set: { unit: "element\xF3w", verb: "mie\u0107" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "wyra\u017Cenie",
		    email: "adres email",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "data i godzina w formacie ISO",
		    date: "data w formacie ISO",
		    time: "godzina w formacie ISO",
		    duration: "czas trwania ISO",
		    ipv4: "adres IPv4",
		    ipv6: "adres IPv6",
		    cidrv4: "zakres IPv4",
		    cidrv6: "zakres IPv6",
		    base64: "ci\u0105g znak\xF3w zakodowany w formacie base64",
		    base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url",
		    json_string: "ci\u0105g znak\xF3w w formacie JSON",
		    e164: "liczba E.164",
		    jwt: "JWT",
		    template_literal: "wej\u015Bcie"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "liczba",
		    array: "tablica"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
		        }
		        return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${expected}, otrzymano ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
		        return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element\xF3w"}`;
		        }
		        return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "element\xF3w"}`;
		        }
		        return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${_issue.pattern}`;
		        return `Nieprawid\u0142ow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Nieprawid\u0142owy klucz w ${issue2.origin}`;
		      case "invalid_union":
		        return "Nieprawid\u0142owe dane wej\u015Bciowe";
		      case "invalid_element":
		        return `Nieprawid\u0142owa warto\u015B\u0107 w ${issue2.origin}`;
		      default:
		        return `Nieprawid\u0142owe dane wej\u015Bciowe`;
		    }
		  };
		};
		function pl_default() {
		  return {
		    localeError: error35()
		  };
		}

		// node_modules/zod/v4/locales/pt.js
		var error36 = () => {
		  const Sizable = {
		    string: { unit: "caracteres", verb: "ter" },
		    file: { unit: "bytes", verb: "ter" },
		    array: { unit: "itens", verb: "ter" },
		    set: { unit: "itens", verb: "ter" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "padr\xE3o",
		    email: "endere\xE7o de e-mail",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "data e hora ISO",
		    date: "data ISO",
		    time: "hora ISO",
		    duration: "dura\xE7\xE3o ISO",
		    ipv4: "endere\xE7o IPv4",
		    ipv6: "endere\xE7o IPv6",
		    cidrv4: "faixa de IPv4",
		    cidrv6: "faixa de IPv6",
		    base64: "texto codificado em base64",
		    base64url: "URL codificada em base64",
		    json_string: "texto JSON",
		    e164: "n\xFAmero E.164",
		    jwt: "JWT",
		    template_literal: "entrada"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "n\xFAmero",
		    null: "nulo"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Tipo inv\xE1lido: esperado instanceof ${issue2.expected}, recebido ${received}`;
		        }
		        return `Tipo inv\xE1lido: esperado ${expected}, recebido ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Entrada inv\xE1lida: esperado ${stringifyPrimitive(issue2.values[0])}`;
		        return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
		        return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Texto inv\xE1lido: deve come\xE7ar com "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Texto inv\xE1lido: deve terminar com "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Texto inv\xE1lido: deve incluir "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${_issue.pattern}`;
		        return `${FormatDictionary[_issue.format] ?? issue2.format} inv\xE1lido`;
		      }
		      case "not_multiple_of":
		        return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Chave inv\xE1lida em ${issue2.origin}`;
		      case "invalid_union":
		        return "Entrada inv\xE1lida";
		      case "invalid_element":
		        return `Valor inv\xE1lido em ${issue2.origin}`;
		      default:
		        return `Campo inv\xE1lido`;
		    }
		  };
		};
		function pt_default() {
		  return {
		    localeError: error36()
		  };
		}

		// node_modules/zod/v4/locales/ro.js
		var error37 = () => {
		  const Sizable = {
		    string: { unit: "caractere", verb: "s\u0103 aib\u0103" },
		    file: { unit: "octe\u021Bi", verb: "s\u0103 aib\u0103" },
		    array: { unit: "elemente", verb: "s\u0103 aib\u0103" },
		    set: { unit: "elemente", verb: "s\u0103 aib\u0103" },
		    map: { unit: "intr\u0103ri", verb: "s\u0103 aib\u0103" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "intrare",
		    email: "adres\u0103 de email",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "dat\u0103 \u0219i or\u0103 ISO",
		    date: "dat\u0103 ISO",
		    time: "or\u0103 ISO",
		    duration: "durat\u0103 ISO",
		    ipv4: "adres\u0103 IPv4",
		    ipv6: "adres\u0103 IPv6",
		    mac: "adres\u0103 MAC",
		    cidrv4: "interval IPv4",
		    cidrv6: "interval IPv6",
		    base64: "\u0219ir codat base64",
		    base64url: "\u0219ir codat base64url",
		    json_string: "\u0219ir JSON",
		    e164: "num\u0103r E.164",
		    jwt: "JWT",
		    template_literal: "intrare"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    string: "\u0219ir",
		    number: "num\u0103r",
		    boolean: "boolean",
		    function: "func\u021Bie",
		    array: "matrice",
		    object: "obiect",
		    undefined: "nedefinit",
		    symbol: "simbol",
		    bigint: "num\u0103r mare",
		    void: "void",
		    never: "never",
		    map: "hart\u0103",
		    set: "set"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        return `Intrare invalid\u0103: a\u0219teptat ${expected}, primit ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Intrare invalid\u0103: a\u0219teptat ${stringifyPrimitive(issue2.values[0])}`;
		        return `Op\u021Biune invalid\u0103: a\u0219teptat una dintre ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Prea mare: a\u0219teptat ca ${issue2.origin ?? "valoarea"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemente"}`;
		        return `Prea mare: a\u0219teptat ca ${issue2.origin ?? "valoarea"} s\u0103 fie ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Prea mic: a\u0219teptat ca ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Prea mic: a\u0219teptat ca ${issue2.origin} s\u0103 fie ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u0218ir invalid: trebuie s\u0103 \xEEnceap\u0103 cu "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `\u0218ir invalid: trebuie s\u0103 se termine cu "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u0218ir invalid: trebuie s\u0103 includ\u0103 "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u0218ir invalid: trebuie s\u0103 se potriveasc\u0103 cu modelul ${_issue.pattern}`;
		        return `Format invalid: ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Num\u0103r invalid: trebuie s\u0103 fie multiplu de ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Chei nerecunoscute: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Cheie invalid\u0103 \xEEn ${issue2.origin}`;
		      case "invalid_union":
		        return "Intrare invalid\u0103";
		      case "invalid_element":
		        return `Valoare invalid\u0103 \xEEn ${issue2.origin}`;
		      default:
		        return `Intrare invalid\u0103`;
		    }
		  };
		};
		function ro_default() {
		  return {
		    localeError: error37()
		  };
		}

		// node_modules/zod/v4/locales/ru.js
		function getRussianPlural(count, one, few, many) {
		  const absCount = Math.abs(count);
		  const lastDigit = absCount % 10;
		  const lastTwoDigits = absCount % 100;
		  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		    return many;
		  }
		  if (lastDigit === 1) {
		    return one;
		  }
		  if (lastDigit >= 2 && lastDigit <= 4) {
		    return few;
		  }
		  return many;
		}
		var error38 = () => {
		  const Sizable = {
		    string: {
		      unit: {
		        one: "\u0441\u0438\u043C\u0432\u043E\u043B",
		        few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430",
		        many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
		      },
		      verb: "\u0438\u043C\u0435\u0442\u044C"
		    },
		    file: {
		      unit: {
		        one: "\u0431\u0430\u0439\u0442",
		        few: "\u0431\u0430\u0439\u0442\u0430",
		        many: "\u0431\u0430\u0439\u0442"
		      },
		      verb: "\u0438\u043C\u0435\u0442\u044C"
		    },
		    array: {
		      unit: {
		        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
		        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
		        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
		      },
		      verb: "\u0438\u043C\u0435\u0442\u044C"
		    },
		    set: {
		      unit: {
		        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
		        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
		        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
		      },
		      verb: "\u0438\u043C\u0435\u0442\u044C"
		    }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0432\u0432\u043E\u0434",
		    email: "email \u0430\u0434\u0440\u0435\u0441",
		    url: "URL",
		    emoji: "\u044D\u043C\u043E\u0434\u0437\u0438",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
		    date: "ISO \u0434\u0430\u0442\u0430",
		    time: "ISO \u0432\u0440\u0435\u043C\u044F",
		    duration: "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
		    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
		    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
		    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
		    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
		    base64: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64",
		    base64url: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url",
		    json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430",
		    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
		    jwt: "JWT",
		    template_literal: "\u0432\u0432\u043E\u0434"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0447\u0438\u0441\u043B\u043E",
		    array: "\u043C\u0430\u0441\u0441\u0438\u0432"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
		        }
		        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          const maxValue = Number(issue2.maximum);
		          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
		          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.maximum.toString()} ${unit}`;
		        }
		        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          const minValue = Number(issue2.minimum);
		          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
		          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.minimum.toString()} ${unit}`;
		        }
		        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
		        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${issue2.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0438" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
		      case "invalid_union":
		        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
		      case "invalid_element":
		        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${issue2.origin}`;
		      default:
		        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435`;
		    }
		  };
		};
		function ru_default() {
		  return {
		    localeError: error38()
		  };
		}

		// node_modules/zod/v4/locales/sl.js
		var error39 = () => {
		  const Sizable = {
		    string: { unit: "znakov", verb: "imeti" },
		    file: { unit: "bajtov", verb: "imeti" },
		    array: { unit: "elementov", verb: "imeti" },
		    set: { unit: "elementov", verb: "imeti" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "vnos",
		    email: "e-po\u0161tni naslov",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO datum in \u010Das",
		    date: "ISO datum",
		    time: "ISO \u010Das",
		    duration: "ISO trajanje",
		    ipv4: "IPv4 naslov",
		    ipv6: "IPv6 naslov",
		    cidrv4: "obseg IPv4",
		    cidrv6: "obseg IPv6",
		    base64: "base64 kodiran niz",
		    base64url: "base64url kodiran niz",
		    json_string: "JSON niz",
		    e164: "E.164 \u0161tevilka",
		    jwt: "JWT",
		    template_literal: "vnos"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0161tevilo",
		    array: "tabela"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Neveljaven vnos: pri\u010Dakovano instanceof ${issue2.expected}, prejeto ${received}`;
		        }
		        return `Neveljaven vnos: pri\u010Dakovano ${expected}, prejeto ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Neveljaven vnos: pri\u010Dakovano ${stringifyPrimitive(issue2.values[0])}`;
		        return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
		        return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `Neveljaven niz: mora se za\u010Deti z "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `Neveljaven niz: mora se kon\u010Dati z "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
		        return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Neprepoznan${issue2.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Neveljaven klju\u010D v ${issue2.origin}`;
		      case "invalid_union":
		        return "Neveljaven vnos";
		      case "invalid_element":
		        return `Neveljavna vrednost v ${issue2.origin}`;
		      default:
		        return "Neveljaven vnos";
		    }
		  };
		};
		function sl_default() {
		  return {
		    localeError: error39()
		  };
		}

		// node_modules/zod/v4/locales/sv.js
		var error40 = () => {
		  const Sizable = {
		    string: { unit: "tecken", verb: "att ha" },
		    file: { unit: "bytes", verb: "att ha" },
		    array: { unit: "objekt", verb: "att inneh\xE5lla" },
		    set: { unit: "objekt", verb: "att inneh\xE5lla" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "regulj\xE4rt uttryck",
		    email: "e-postadress",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO-datum och tid",
		    date: "ISO-datum",
		    time: "ISO-tid",
		    duration: "ISO-varaktighet",
		    ipv4: "IPv4-intervall",
		    ipv6: "IPv6-intervall",
		    cidrv4: "IPv4-spektrum",
		    cidrv6: "IPv6-spektrum",
		    base64: "base64-kodad str\xE4ng",
		    base64url: "base64url-kodad str\xE4ng",
		    json_string: "JSON-str\xE4ng",
		    e164: "E.164-nummer",
		    jwt: "JWT",
		    template_literal: "mall-literal"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "antal",
		    array: "lista"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${issue2.expected}, fick ${received}`;
		        }
		        return `Ogiltig inmatning: f\xF6rv\xE4ntat ${expected}, fick ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Ogiltig inmatning: f\xF6rv\xE4ntat ${stringifyPrimitive(issue2.values[0])}`;
		        return `Ogiltigt val: f\xF6rv\xE4ntade en av ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `F\xF6r stor(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
		        }
		        return `F\xF6r stor(t): f\xF6rv\xE4ntat ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `Ogiltig str\xE4ng: m\xE5ste sluta med "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${_issue.pattern}"`;
		        return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Ogiltigt tal: m\xE5ste vara en multipel av ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `${issue2.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Ogiltig nyckel i ${issue2.origin ?? "v\xE4rdet"}`;
		      case "invalid_union":
		        return "Ogiltig input";
		      case "invalid_element":
		        return `Ogiltigt v\xE4rde i ${issue2.origin ?? "v\xE4rdet"}`;
		      default:
		        return `Ogiltig input`;
		    }
		  };
		};
		function sv_default() {
		  return {
		    localeError: error40()
		  };
		}

		// node_modules/zod/v4/locales/ta.js
		var error41 = () => {
		  const Sizable = {
		    string: { unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
		    file: { unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
		    array: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
		    set: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1",
		    email: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
		    date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF",
		    time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
		    duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1",
		    ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
		    ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
		    cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
		    cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
		    base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
		    base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
		    json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD",
		    e164: "E.164 \u0B8E\u0BA3\u0BCD",
		    jwt: "JWT",
		    template_literal: "input"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0B8E\u0BA3\u0BCD",
		    array: "\u0B85\u0BA3\u0BBF",
		    null: "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 instanceof ${issue2.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
		        }
		        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${joinValues(issue2.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
		        }
		        return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
		        }
		        return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
		        if (_issue.format === "ends_with")
		          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
		        if (_issue.format === "includes")
		          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
		        if (_issue.format === "regex")
		          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${_issue.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
		        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${issue2.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
		      case "unrecognized_keys":
		        return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${issue2.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
		      case "invalid_union":
		        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
		      case "invalid_element":
		        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
		      default:
		        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1`;
		    }
		  };
		};
		function ta_default() {
		  return {
		    localeError: error41()
		  };
		}

		// node_modules/zod/v4/locales/th.js
		var error42 = () => {
		  const Sizable = {
		    string: { unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
		    file: { unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
		    array: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
		    set: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
		    email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25",
		    url: "URL",
		    emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
		    date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO",
		    time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
		    duration: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
		    ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4",
		    ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6",
		    cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4",
		    cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6",
		    base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64",
		    base64url: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL",
		    json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON",
		    e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)",
		    jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT",
		    template_literal: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02",
		    array: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)",
		    null: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 instanceof ${issue2.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
		        }
		        return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19" : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}`;
		        return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22" : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${_issue.prefix}"`;
		        }
		        if (_issue.format === "ends_with")
		          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${_issue.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
		        if (_issue.format === "regex")
		          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${_issue.pattern}`;
		        return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${issue2.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
		      case "unrecognized_keys":
		        return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
		      case "invalid_union":
		        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
		      case "invalid_element":
		        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
		      default:
		        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07`;
		    }
		  };
		};
		function th_default() {
		  return {
		    localeError: error42()
		  };
		}

		// node_modules/zod/v4/locales/tr.js
		var error43 = () => {
		  const Sizable = {
		    string: { unit: "karakter", verb: "olmal\u0131" },
		    file: { unit: "bayt", verb: "olmal\u0131" },
		    array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
		    set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "girdi",
		    email: "e-posta adresi",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO tarih ve saat",
		    date: "ISO tarih",
		    time: "ISO saat",
		    duration: "ISO s\xFCre",
		    ipv4: "IPv4 adresi",
		    ipv6: "IPv6 adresi",
		    cidrv4: "IPv4 aral\u0131\u011F\u0131",
		    cidrv6: "IPv6 aral\u0131\u011F\u0131",
		    base64: "base64 ile \u015Fifrelenmi\u015F metin",
		    base64url: "base64url ile \u015Fifrelenmi\u015F metin",
		    json_string: "JSON dizesi",
		    e164: "E.164 say\u0131s\u0131",
		    jwt: "JWT",
		    template_literal: "\u015Eablon dizesi"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${issue2.expected}, al\u0131nan ${received}`;
		        }
		        return `Ge\xE7ersiz de\u011Fer: beklenen ${expected}, al\u0131nan ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Ge\xE7ersiz de\u011Fer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
		        return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xF6\u011Fe"}`;
		        return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Ge\xE7ersiz metin: "${_issue.prefix}" ile ba\u015Flamal\u0131`;
		        if (_issue.format === "ends_with")
		          return `Ge\xE7ersiz metin: "${_issue.suffix}" ile bitmeli`;
		        if (_issue.format === "includes")
		          return `Ge\xE7ersiz metin: "${_issue.includes}" i\xE7ermeli`;
		        if (_issue.format === "regex")
		          return `Ge\xE7ersiz metin: ${_issue.pattern} desenine uymal\u0131`;
		        return `Ge\xE7ersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Ge\xE7ersiz say\u0131: ${issue2.divisor} ile tam b\xF6l\xFCnebilmeli`;
		      case "unrecognized_keys":
		        return `Tan\u0131nmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `${issue2.origin} i\xE7inde ge\xE7ersiz anahtar`;
		      case "invalid_union":
		        return "Ge\xE7ersiz de\u011Fer";
		      case "invalid_element":
		        return `${issue2.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
		      default:
		        return `Ge\xE7ersiz de\u011Fer`;
		    }
		  };
		};
		function tr_default() {
		  return {
		    localeError: error43()
		  };
		}

		// node_modules/zod/v4/locales/uk.js
		var error44 = () => {
		  const Sizable = {
		    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
		    file: { unit: "\u0431\u0430\u0439\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
		    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
		    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
		    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438",
		    url: "URL",
		    emoji: "\u0435\u043C\u043E\u0434\u0437\u0456",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO",
		    date: "\u0434\u0430\u0442\u0430 ISO",
		    time: "\u0447\u0430\u0441 ISO",
		    duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO",
		    ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4",
		    ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6",
		    cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4",
		    cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6",
		    base64: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64",
		    base64url: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url",
		    json_string: "\u0440\u044F\u0434\u043E\u043A JSON",
		    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
		    jwt: "JWT",
		    template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0447\u0438\u0441\u043B\u043E",
		    array: "\u043C\u0430\u0441\u0438\u0432"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F instanceof ${issue2.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
		        }
		        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}`;
		        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} \u0431\u0443\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
		        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0456" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
		      case "invalid_union":
		        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
		      case "invalid_element":
		        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${issue2.origin}`;
		      default:
		        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456`;
		    }
		  };
		};
		function uk_default() {
		  return {
		    localeError: error44()
		  };
		}

		// node_modules/zod/v4/locales/ua.js
		function ua_default() {
		  return uk_default();
		}

		// node_modules/zod/v4/locales/ur.js
		var error45 = () => {
		  const Sizable = {
		    string: { unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627" },
		    file: { unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627" },
		    array: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" },
		    set: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0627\u0646 \u067E\u0679",
		    email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633",
		    url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644",
		    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
		    uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
		    uuidv4: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4",
		    uuidv6: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6",
		    nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC",
		    guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
		    cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
		    cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2",
		    ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC",
		    xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC",
		    ksuid: "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
		    datetime: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645",
		    date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E",
		    time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A",
		    duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A",
		    ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633",
		    ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633",
		    cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C",
		    cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C",
		    base64: "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
		    base64url: "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
		    json_string: "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF",
		    e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631",
		    jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC",
		    template_literal: "\u0627\u0646 \u067E\u0679"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u0646\u0645\u0628\u0631",
		    array: "\u0622\u0631\u06D2",
		    null: "\u0646\u0644"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: instanceof ${issue2.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
		        }
		        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${stringifyPrimitive(issue2.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
		        return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${joinValues(issue2.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
		        return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${adj}${issue2.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u06D2 ${adj}${issue2.minimum.toString()} ${sizing.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
		        }
		        return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u0627 ${adj}${issue2.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
		        }
		        if (_issue.format === "ends_with")
		          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
		        if (_issue.format === "includes")
		          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
		        if (_issue.format === "regex")
		          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${_issue.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
		        return `\u063A\u0644\u0637 ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${issue2.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
		      case "unrecognized_keys":
		        return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${issue2.keys.length > 1 ? "\u0632" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
		      case "invalid_key":
		        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
		      case "invalid_union":
		        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
		      case "invalid_element":
		        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
		      default:
		        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679`;
		    }
		  };
		};
		function ur_default() {
		  return {
		    localeError: error45()
		  };
		}

		// node_modules/zod/v4/locales/uz.js
		var error46 = () => {
		  const Sizable = {
		    string: { unit: "belgi", verb: "bo\u2018lishi kerak" },
		    file: { unit: "bayt", verb: "bo\u2018lishi kerak" },
		    array: { unit: "element", verb: "bo\u2018lishi kerak" },
		    set: { unit: "element", verb: "bo\u2018lishi kerak" },
		    map: { unit: "yozuv", verb: "bo\u2018lishi kerak" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "kirish",
		    email: "elektron pochta manzili",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO sana va vaqti",
		    date: "ISO sana",
		    time: "ISO vaqt",
		    duration: "ISO davomiylik",
		    ipv4: "IPv4 manzil",
		    ipv6: "IPv6 manzil",
		    mac: "MAC manzil",
		    cidrv4: "IPv4 diapazon",
		    cidrv6: "IPv6 diapazon",
		    base64: "base64 kodlangan satr",
		    base64url: "base64url kodlangan satr",
		    json_string: "JSON satr",
		    e164: "E.164 raqam",
		    jwt: "JWT",
		    template_literal: "kirish"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "raqam",
		    array: "massiv"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
		        }
		        return `Noto\u2018g\u2018ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `Noto\u2018g\u2018ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
		        return `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
		        return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
		        }
		        return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Noto\u2018g\u2018ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
		        if (_issue.format === "ends_with")
		          return `Noto\u2018g\u2018ri satr: "${_issue.suffix}" bilan tugashi kerak`;
		        if (_issue.format === "includes")
		          return `Noto\u2018g\u2018ri satr: "${_issue.includes}" ni o\u2018z ichiga olishi kerak`;
		        if (_issue.format === "regex")
		          return `Noto\u2018g\u2018ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
		        return `Noto\u2018g\u2018ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `Noto\u2018g\u2018ri raqam: ${issue2.divisor} ning karralisi bo\u2018lishi kerak`;
		      case "unrecognized_keys":
		        return `Noma\u2019lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `${issue2.origin} dagi kalit noto\u2018g\u2018ri`;
		      case "invalid_union":
		        return "Noto\u2018g\u2018ri kirish";
		      case "invalid_element":
		        return `${issue2.origin} da noto\u2018g\u2018ri qiymat`;
		      default:
		        return `Noto\u2018g\u2018ri kirish`;
		    }
		  };
		};
		function uz_default() {
		  return {
		    localeError: error46()
		  };
		}

		// node_modules/zod/v4/locales/vi.js
		var error47 = () => {
		  const Sizable = {
		    string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" },
		    file: { unit: "byte", verb: "c\xF3" },
		    array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
		    set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u0111\u1EA7u v\xE0o",
		    email: "\u0111\u1ECBa ch\u1EC9 email",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ng\xE0y gi\u1EDD ISO",
		    date: "ng\xE0y ISO",
		    time: "gi\u1EDD ISO",
		    duration: "kho\u1EA3ng th\u1EDDi gian ISO",
		    ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4",
		    ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6",
		    cidrv4: "d\u1EA3i IPv4",
		    cidrv6: "d\u1EA3i IPv6",
		    base64: "chu\u1ED7i m\xE3 h\xF3a base64",
		    base64url: "chu\u1ED7i m\xE3 h\xF3a base64url",
		    json_string: "chu\u1ED7i JSON",
		    e164: "s\u1ED1 E.164",
		    jwt: "JWT",
		    template_literal: "\u0111\u1EA7u v\xE0o"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "s\u1ED1",
		    array: "m\u1EA3ng"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${issue2.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
		        }
		        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${stringifyPrimitive(issue2.values[0])}`;
		        return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "ph\u1EA7n t\u1EED"}`;
		        return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${_issue.pattern}`;
		        return `${FormatDictionary[_issue.format] ?? issue2.format} kh\xF4ng h\u1EE3p l\u1EC7`;
		      }
		      case "not_multiple_of":
		        return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
		      case "invalid_union":
		        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
		      case "invalid_element":
		        return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
		      default:
		        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7`;
		    }
		  };
		};
		function vi_default() {
		  return {
		    localeError: error47()
		  };
		}

		// node_modules/zod/v4/locales/zh-CN.js
		var error48 = () => {
		  const Sizable = {
		    string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" },
		    file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" },
		    array: { unit: "\u9879", verb: "\u5305\u542B" },
		    set: { unit: "\u9879", verb: "\u5305\u542B" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u8F93\u5165",
		    email: "\u7535\u5B50\u90AE\u4EF6",
		    url: "URL",
		    emoji: "\u8868\u60C5\u7B26\u53F7",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO\u65E5\u671F\u65F6\u95F4",
		    date: "ISO\u65E5\u671F",
		    time: "ISO\u65F6\u95F4",
		    duration: "ISO\u65F6\u957F",
		    ipv4: "IPv4\u5730\u5740",
		    ipv6: "IPv6\u5730\u5740",
		    cidrv4: "IPv4\u7F51\u6BB5",
		    cidrv6: "IPv6\u7F51\u6BB5",
		    base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32",
		    base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32",
		    json_string: "JSON\u5B57\u7B26\u4E32",
		    e164: "E.164\u53F7\u7801",
		    jwt: "JWT",
		    template_literal: "\u8F93\u5165"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "\u6570\u5B57",
		    array: "\u6570\u7EC4",
		    null: "\u7A7A\u503C(null)"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${issue2.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
		        }
		        return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u4E2A\u5143\u7D20"}`;
		        return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.prefix}" \u5F00\u5934`;
		        if (_issue.format === "ends_with")
		          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.suffix}" \u7ED3\u5C3E`;
		        if (_issue.format === "includes")
		          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${_issue.pattern}`;
		        return `\u65E0\u6548${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${issue2.divisor} \u7684\u500D\u6570`;
		      case "unrecognized_keys":
		        return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `${issue2.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
		      case "invalid_union":
		        return "\u65E0\u6548\u8F93\u5165";
		      case "invalid_element":
		        return `${issue2.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
		      default:
		        return `\u65E0\u6548\u8F93\u5165`;
		    }
		  };
		};
		function zh_CN_default() {
		  return {
		    localeError: error48()
		  };
		}

		// node_modules/zod/v4/locales/zh-TW.js
		var error49 = () => {
		  const Sizable = {
		    string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" },
		    file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" },
		    array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
		    set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u8F38\u5165",
		    email: "\u90F5\u4EF6\u5730\u5740",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "ISO \u65E5\u671F\u6642\u9593",
		    date: "ISO \u65E5\u671F",
		    time: "ISO \u6642\u9593",
		    duration: "ISO \u671F\u9593",
		    ipv4: "IPv4 \u4F4D\u5740",
		    ipv6: "IPv6 \u4F4D\u5740",
		    cidrv4: "IPv4 \u7BC4\u570D",
		    cidrv6: "IPv6 \u7BC4\u570D",
		    base64: "base64 \u7DE8\u78BC\u5B57\u4E32",
		    base64url: "base64url \u7DE8\u78BC\u5B57\u4E32",
		    json_string: "JSON \u5B57\u4E32",
		    e164: "E.164 \u6578\u503C",
		    jwt: "JWT",
		    template_literal: "\u8F38\u5165"
		  };
		  const TypeDictionary = {
		    nan: "NaN"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${issue2.expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
		        }
		        return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${stringifyPrimitive(issue2.values[0])}`;
		        return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u500B\u5143\u7D20"}`;
		        return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing) {
		          return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
		        }
		        return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with") {
		          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.prefix}" \u958B\u982D`;
		        }
		        if (_issue.format === "ends_with")
		          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.suffix}" \u7D50\u5C3E`;
		        if (_issue.format === "includes")
		          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${_issue.pattern}`;
		        return `\u7121\u6548\u7684 ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${issue2.divisor} \u7684\u500D\u6578`;
		      case "unrecognized_keys":
		        return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${issue2.keys.length > 1 ? "\u5011" : ""}\uFF1A${joinValues(issue2.keys, "\u3001")}`;
		      case "invalid_key":
		        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
		      case "invalid_union":
		        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
		      case "invalid_element":
		        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
		      default:
		        return `\u7121\u6548\u7684\u8F38\u5165\u503C`;
		    }
		  };
		};
		function zh_TW_default() {
		  return {
		    localeError: error49()
		  };
		}

		// node_modules/zod/v4/locales/yo.js
		var error50 = () => {
		  const Sizable = {
		    string: { unit: "\xE0mi", verb: "n\xED" },
		    file: { unit: "bytes", verb: "n\xED" },
		    array: { unit: "nkan", verb: "n\xED" },
		    set: { unit: "nkan", verb: "n\xED" }
		  };
		  function getSizing(origin) {
		    return Sizable[origin] ?? null;
		  }
		  const FormatDictionary = {
		    regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9",
		    email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC",
		    url: "URL",
		    emoji: "emoji",
		    uuid: "UUID",
		    uuidv4: "UUIDv4",
		    uuidv6: "UUIDv6",
		    nanoid: "nanoid",
		    guid: "GUID",
		    cuid: "cuid",
		    cuid2: "cuid2",
		    ulid: "ULID",
		    xid: "XID",
		    ksuid: "KSUID",
		    datetime: "\xE0k\xF3k\xF2 ISO",
		    date: "\u1ECDj\u1ECD\u0301 ISO",
		    time: "\xE0k\xF3k\xF2 ISO",
		    duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO",
		    ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4",
		    ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6",
		    cidrv4: "\xE0gb\xE8gb\xE8 IPv4",
		    cidrv6: "\xE0gb\xE8gb\xE8 IPv6",
		    base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64",
		    base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url",
		    json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON",
		    e164: "n\u1ECD\u0301mb\xE0 E.164",
		    jwt: "JWT",
		    template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9"
		  };
		  const TypeDictionary = {
		    nan: "NaN",
		    number: "n\u1ECD\u0301mb\xE0",
		    array: "akop\u1ECD"
		  };
		  return (issue2) => {
		    switch (issue2.code) {
		      case "invalid_type": {
		        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
		        const receivedType = parsedType(issue2.input);
		        const received = TypeDictionary[receivedType] ?? receivedType;
		        if (/^[A-Z]/.test(issue2.expected)) {
		          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${issue2.expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
		        }
		        return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
		      }
		      case "invalid_value":
		        if (issue2.values.length === 1)
		          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${stringifyPrimitive(issue2.values[0])}`;
		        return `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${joinValues(issue2.values, "|")}`;
		      case "too_big": {
		        const adj = issue2.inclusive ? "<=" : "<";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
		        return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.maximum}`;
		      }
		      case "too_small": {
		        const adj = issue2.inclusive ? ">=" : ">";
		        const sizing = getSizing(issue2.origin);
		        if (sizing)
		          return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
		        return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.minimum}`;
		      }
		      case "invalid_format": {
		        const _issue = issue2;
		        if (_issue.format === "starts_with")
		          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${_issue.prefix}"`;
		        if (_issue.format === "ends_with")
		          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${_issue.suffix}"`;
		        if (_issue.format === "includes")
		          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${_issue.includes}"`;
		        if (_issue.format === "regex")
		          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${_issue.pattern}`;
		        return `A\u1E63\xEC\u1E63e: ${FormatDictionary[_issue.format] ?? issue2.format}`;
		      }
		      case "not_multiple_of":
		        return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${issue2.divisor}`;
		      case "unrecognized_keys":
		        return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${joinValues(issue2.keys, ", ")}`;
		      case "invalid_key":
		        return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
		      case "invalid_union":
		        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
		      case "invalid_element":
		        return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
		      default:
		        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
		    }
		  };
		};
		function yo_default() {
		  return {
		    localeError: error50()
		  };
		}

		// node_modules/zod/v4/core/registries.js
		var _a2;
		var $output = Symbol("ZodOutput");
		var $input = Symbol("ZodInput");
		var $ZodRegistry = class {
		  constructor() {
		    this._map = /* @__PURE__ */ new WeakMap();
		    this._idmap = /* @__PURE__ */ new Map();
		  }
		  add(schema, ..._meta) {
		    const meta3 = _meta[0];
		    this._map.set(schema, meta3);
		    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
		      this._idmap.set(meta3.id, schema);
		    }
		    return this;
		  }
		  clear() {
		    this._map = /* @__PURE__ */ new WeakMap();
		    this._idmap = /* @__PURE__ */ new Map();
		    return this;
		  }
		  remove(schema) {
		    const meta3 = this._map.get(schema);
		    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
		      this._idmap.delete(meta3.id);
		    }
		    this._map.delete(schema);
		    return this;
		  }
		  get(schema) {
		    const p = schema._zod.parent;
		    if (p) {
		      const pm = { ...this.get(p) ?? {} };
		      delete pm.id;
		      const f = { ...pm, ...this._map.get(schema) };
		      return Object.keys(f).length ? f : void 0;
		    }
		    return this._map.get(schema);
		  }
		  has(schema) {
		    return this._map.has(schema);
		  }
		};
		function registry() {
		  return new $ZodRegistry();
		}
		(_a2 = globalThis).__zod_globalRegistry ?? (_a2.__zod_globalRegistry = registry());
		var globalRegistry = globalThis.__zod_globalRegistry;

		// node_modules/zod/v4/core/api.js
		// @__NO_SIDE_EFFECTS__
		function _string(Class2, params) {
		  return new Class2({
		    type: "string",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _coercedString(Class2, params) {
		  return new Class2({
		    type: "string",
		    coerce: true,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "email",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "guid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "uuid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "uuid",
		    check: "string_format",
		    abort: false,
		    version: "v4",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "uuid",
		    check: "string_format",
		    abort: false,
		    version: "v6",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "uuid",
		    check: "string_format",
		    abort: false,
		    version: "v7",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "url",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji2(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "emoji",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "nanoid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "cuid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "cuid2",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "ulid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "xid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "ksuid",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "ipv4",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "ipv6",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _mac(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "mac",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "cidrv4",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "cidrv6",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "base64",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "base64url",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "e164",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "jwt",
		    check: "string_format",
		    abort: false,
		    ...normalizeParams(params)
		  });
		}
		var TimePrecision = {
		  Any: null,
		  Minute: -1,
		  Second: 0,
		  Millisecond: 3,
		  Microsecond: 6
		};
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "datetime",
		    check: "string_format",
		    offset: false,
		    local: false,
		    precision: null,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDate(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "date",
		    check: "string_format",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "time",
		    check: "string_format",
		    precision: null,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class2, params) {
		  return new Class2({
		    type: "string",
		    format: "duration",
		    check: "string_format",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class2, params) {
		  return new Class2({
		    type: "number",
		    checks: [],
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _coercedNumber(Class2, params) {
		  return new Class2({
		    type: "number",
		    coerce: true,
		    checks: [],
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class2, params) {
		  return new Class2({
		    type: "number",
		    check: "number_format",
		    abort: false,
		    format: "safeint",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _float32(Class2, params) {
		  return new Class2({
		    type: "number",
		    check: "number_format",
		    abort: false,
		    format: "float32",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _float64(Class2, params) {
		  return new Class2({
		    type: "number",
		    check: "number_format",
		    abort: false,
		    format: "float64",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _int32(Class2, params) {
		  return new Class2({
		    type: "number",
		    check: "number_format",
		    abort: false,
		    format: "int32",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uint32(Class2, params) {
		  return new Class2({
		    type: "number",
		    check: "number_format",
		    abort: false,
		    format: "uint32",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _boolean(Class2, params) {
		  return new Class2({
		    type: "boolean",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _coercedBoolean(Class2, params) {
		  return new Class2({
		    type: "boolean",
		    coerce: true,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _bigint(Class2, params) {
		  return new Class2({
		    type: "bigint",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _coercedBigint(Class2, params) {
		  return new Class2({
		    type: "bigint",
		    coerce: true,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _int64(Class2, params) {
		  return new Class2({
		    type: "bigint",
		    check: "bigint_format",
		    abort: false,
		    format: "int64",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uint64(Class2, params) {
		  return new Class2({
		    type: "bigint",
		    check: "bigint_format",
		    abort: false,
		    format: "uint64",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _symbol(Class2, params) {
		  return new Class2({
		    type: "symbol",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _undefined2(Class2, params) {
		  return new Class2({
		    type: "undefined",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _null2(Class2, params) {
		  return new Class2({
		    type: "null",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _any(Class2) {
		  return new Class2({
		    type: "any"
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class2) {
		  return new Class2({
		    type: "unknown"
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class2, params) {
		  return new Class2({
		    type: "never",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _void(Class2, params) {
		  return new Class2({
		    type: "void",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _date(Class2, params) {
		  return new Class2({
		    type: "date",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _coercedDate(Class2, params) {
		  return new Class2({
		    type: "date",
		    coerce: true,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _nan(Class2, params) {
		  return new Class2({
		    type: "nan",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _lt(value, params) {
		  return new $ZodCheckLessThan({
		    check: "less_than",
		    ...normalizeParams(params),
		    value,
		    inclusive: false
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _lte(value, params) {
		  return new $ZodCheckLessThan({
		    check: "less_than",
		    ...normalizeParams(params),
		    value,
		    inclusive: true
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _gt(value, params) {
		  return new $ZodCheckGreaterThan({
		    check: "greater_than",
		    ...normalizeParams(params),
		    value,
		    inclusive: false
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _gte(value, params) {
		  return new $ZodCheckGreaterThan({
		    check: "greater_than",
		    ...normalizeParams(params),
		    value,
		    inclusive: true
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _positive(params) {
		  return /* @__PURE__ */ _gt(0, params);
		}
		// @__NO_SIDE_EFFECTS__
		function _negative(params) {
		  return /* @__PURE__ */ _lt(0, params);
		}
		// @__NO_SIDE_EFFECTS__
		function _nonpositive(params) {
		  return /* @__PURE__ */ _lte(0, params);
		}
		// @__NO_SIDE_EFFECTS__
		function _nonnegative(params) {
		  return /* @__PURE__ */ _gte(0, params);
		}
		// @__NO_SIDE_EFFECTS__
		function _multipleOf(value, params) {
		  return new $ZodCheckMultipleOf({
		    check: "multiple_of",
		    ...normalizeParams(params),
		    value
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _maxSize(maximum, params) {
		  return new $ZodCheckMaxSize({
		    check: "max_size",
		    ...normalizeParams(params),
		    maximum
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _minSize(minimum, params) {
		  return new $ZodCheckMinSize({
		    check: "min_size",
		    ...normalizeParams(params),
		    minimum
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _size(size, params) {
		  return new $ZodCheckSizeEquals({
		    check: "size_equals",
		    ...normalizeParams(params),
		    size
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _maxLength(maximum, params) {
		  const ch = new $ZodCheckMaxLength({
		    check: "max_length",
		    ...normalizeParams(params),
		    maximum
		  });
		  return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _minLength(minimum, params) {
		  return new $ZodCheckMinLength({
		    check: "min_length",
		    ...normalizeParams(params),
		    minimum
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _length(length, params) {
		  return new $ZodCheckLengthEquals({
		    check: "length_equals",
		    ...normalizeParams(params),
		    length
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _regex(pattern, params) {
		  return new $ZodCheckRegex({
		    check: "string_format",
		    format: "regex",
		    ...normalizeParams(params),
		    pattern
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _lowercase(params) {
		  return new $ZodCheckLowerCase({
		    check: "string_format",
		    format: "lowercase",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _uppercase(params) {
		  return new $ZodCheckUpperCase({
		    check: "string_format",
		    format: "uppercase",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _includes(includes, params) {
		  return new $ZodCheckIncludes({
		    check: "string_format",
		    format: "includes",
		    ...normalizeParams(params),
		    includes
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _startsWith(prefix, params) {
		  return new $ZodCheckStartsWith({
		    check: "string_format",
		    format: "starts_with",
		    ...normalizeParams(params),
		    prefix
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _endsWith(suffix, params) {
		  return new $ZodCheckEndsWith({
		    check: "string_format",
		    format: "ends_with",
		    ...normalizeParams(params),
		    suffix
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _property(property, schema, params) {
		  return new $ZodCheckProperty({
		    check: "property",
		    property,
		    schema,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _mime(types, params) {
		  return new $ZodCheckMimeType({
		    check: "mime_type",
		    mime: types,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _overwrite(tx) {
		  return new $ZodCheckOverwrite({
		    check: "overwrite",
		    tx
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _normalize(form) {
		  return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
		}
		// @__NO_SIDE_EFFECTS__
		function _trim() {
		  return /* @__PURE__ */ _overwrite((input) => input.trim());
		}
		// @__NO_SIDE_EFFECTS__
		function _toLowerCase() {
		  return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _toUpperCase() {
		  return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _slugify() {
		  return /* @__PURE__ */ _overwrite((input) => slugify(input));
		}
		// @__NO_SIDE_EFFECTS__
		function _array(Class2, element, params) {
		  return new Class2({
		    type: "array",
		    element,
		    // get element() {
		    //   return element;
		    // },
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _union(Class2, options, params) {
		  return new Class2({
		    type: "union",
		    options,
		    ...normalizeParams(params)
		  });
		}
		function _xor(Class2, options, params) {
		  return new Class2({
		    type: "union",
		    options,
		    inclusive: false,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _discriminatedUnion(Class2, discriminator, options, params) {
		  return new Class2({
		    type: "union",
		    options,
		    discriminator,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _intersection(Class2, left, right) {
		  return new Class2({
		    type: "intersection",
		    left,
		    right
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _tuple(Class2, items, _paramsOrRest, _params) {
		  const hasRest = _paramsOrRest instanceof $ZodType;
		  const params = hasRest ? _params : _paramsOrRest;
		  const rest = hasRest ? _paramsOrRest : null;
		  return new Class2({
		    type: "tuple",
		    items,
		    rest,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _record(Class2, keyType, valueType, params) {
		  return new Class2({
		    type: "record",
		    keyType,
		    valueType,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _map(Class2, keyType, valueType, params) {
		  return new Class2({
		    type: "map",
		    keyType,
		    valueType,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _set(Class2, valueType, params) {
		  return new Class2({
		    type: "set",
		    valueType,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _enum(Class2, values, params) {
		  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
		  return new Class2({
		    type: "enum",
		    entries,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _nativeEnum(Class2, entries, params) {
		  return new Class2({
		    type: "enum",
		    entries,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _literal(Class2, value, params) {
		  return new Class2({
		    type: "literal",
		    values: Array.isArray(value) ? value : [value],
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _file(Class2, params) {
		  return new Class2({
		    type: "file",
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _transform(Class2, fn) {
		  return new Class2({
		    type: "transform",
		    transform: fn
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _optional(Class2, innerType) {
		  return new Class2({
		    type: "optional",
		    innerType
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _nullable(Class2, innerType) {
		  return new Class2({
		    type: "nullable",
		    innerType
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _default(Class2, innerType, defaultValue) {
		  return new Class2({
		    type: "default",
		    innerType,
		    get defaultValue() {
		      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		    }
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _nonoptional(Class2, innerType, params) {
		  return new Class2({
		    type: "nonoptional",
		    innerType,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _success(Class2, innerType) {
		  return new Class2({
		    type: "success",
		    innerType
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _catch(Class2, innerType, catchValue) {
		  return new Class2({
		    type: "catch",
		    innerType,
		    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _pipe(Class2, in_, out) {
		  return new Class2({
		    type: "pipe",
		    in: in_,
		    out
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _readonly(Class2, innerType) {
		  return new Class2({
		    type: "readonly",
		    innerType
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _templateLiteral(Class2, parts, params) {
		  return new Class2({
		    type: "template_literal",
		    parts,
		    ...normalizeParams(params)
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _lazy(Class2, getter) {
		  return new Class2({
		    type: "lazy",
		    getter
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _promise(Class2, innerType) {
		  return new Class2({
		    type: "promise",
		    innerType
		  });
		}
		// @__NO_SIDE_EFFECTS__
		function _custom(Class2, fn, _params) {
		  const norm = normalizeParams(_params);
		  norm.abort ?? (norm.abort = true);
		  const schema = new Class2({
		    type: "custom",
		    check: "custom",
		    fn,
		    ...norm
		  });
		  return schema;
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class2, fn, _params) {
		  const schema = new Class2({
		    type: "custom",
		    check: "custom",
		    fn,
		    ...normalizeParams(_params)
		  });
		  return schema;
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
		  const ch = /* @__PURE__ */ _check((payload) => {
		    payload.addIssue = (issue2) => {
		      if (typeof issue2 === "string") {
		        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
		      } else {
		        const _issue = issue2;
		        if (_issue.fatal)
		          _issue.continue = false;
		        _issue.code ?? (_issue.code = "custom");
		        _issue.input ?? (_issue.input = payload.value);
		        _issue.inst ?? (_issue.inst = ch);
		        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
		        payload.issues.push(issue(_issue));
		      }
		    };
		    return fn(payload.value, payload);
		  }, params);
		  return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _check(fn, params) {
		  const ch = new $ZodCheck({
		    check: "custom",
		    ...normalizeParams(params)
		  });
		  ch._zod.check = fn;
		  return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function describe(description) {
		  const ch = new $ZodCheck({ check: "describe" });
		  ch._zod.onattach = [
		    (inst) => {
		      const existing = globalRegistry.get(inst) ?? {};
		      globalRegistry.add(inst, { ...existing, description });
		    }
		  ];
		  ch._zod.check = () => {
		  };
		  return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function meta(metadata) {
		  const ch = new $ZodCheck({ check: "meta" });
		  ch._zod.onattach = [
		    (inst) => {
		      const existing = globalRegistry.get(inst) ?? {};
		      globalRegistry.add(inst, { ...existing, ...metadata });
		    }
		  ];
		  ch._zod.check = () => {
		  };
		  return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _stringbool(Classes, _params) {
		  const params = normalizeParams(_params);
		  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
		  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
		  if (params.case !== "sensitive") {
		    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
		    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
		  }
		  const truthySet = new Set(truthyArray);
		  const falsySet = new Set(falsyArray);
		  const _Codec = Classes.Codec ?? $ZodCodec;
		  const _Boolean = Classes.Boolean ?? $ZodBoolean;
		  const _String = Classes.String ?? $ZodString;
		  const stringSchema = new _String({ type: "string", error: params.error });
		  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
		  const codec2 = new _Codec({
		    type: "pipe",
		    in: stringSchema,
		    out: booleanSchema,
		    transform: ((input, payload) => {
		      let data = input;
		      if (params.case !== "sensitive")
		        data = data.toLowerCase();
		      if (truthySet.has(data)) {
		        return true;
		      } else if (falsySet.has(data)) {
		        return false;
		      } else {
		        payload.issues.push({
		          code: "invalid_value",
		          expected: "stringbool",
		          values: [...truthySet, ...falsySet],
		          input: payload.value,
		          inst: codec2,
		          continue: false
		        });
		        return {};
		      }
		    }),
		    reverseTransform: ((input, _payload) => {
		      if (input === true) {
		        return truthyArray[0] || "true";
		      } else {
		        return falsyArray[0] || "false";
		      }
		    }),
		    error: params.error
		  });
		  return codec2;
		}
		// @__NO_SIDE_EFFECTS__
		function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
		  const params = normalizeParams(_params);
		  const def = {
		    ...normalizeParams(_params),
		    check: "string_format",
		    type: "string",
		    format,
		    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
		    ...params
		  };
		  if (fnOrRegex instanceof RegExp) {
		    def.pattern = fnOrRegex;
		  }
		  const inst = new Class2(def);
		  return inst;
		}

		// node_modules/zod/v4/core/to-json-schema.js
		function initializeContext(params) {
		  let target = params?.target ?? "draft-2020-12";
		  if (target === "draft-4")
		    target = "draft-04";
		  if (target === "draft-7")
		    target = "draft-07";
		  return {
		    processors: params.processors ?? {},
		    metadataRegistry: params?.metadata ?? globalRegistry,
		    target,
		    unrepresentable: params?.unrepresentable ?? "throw",
		    override: params?.override ?? (() => {
		    }),
		    io: params?.io ?? "output",
		    counter: 0,
		    seen: /* @__PURE__ */ new Map(),
		    cycles: params?.cycles ?? "ref",
		    reused: params?.reused ?? "inline",
		    external: params?.external ?? void 0
		  };
		}
		function process(schema, ctx, _params = { path: [], schemaPath: [] }) {
		  var _a3;
		  const def = schema._zod.def;
		  const seen = ctx.seen.get(schema);
		  if (seen) {
		    seen.count++;
		    const isCycle = _params.schemaPath.includes(schema);
		    if (isCycle) {
		      seen.cycle = _params.path;
		    }
		    return seen.schema;
		  }
		  const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
		  ctx.seen.set(schema, result);
		  const overrideSchema = schema._zod.toJSONSchema?.();
		  if (overrideSchema) {
		    result.schema = overrideSchema;
		  } else {
		    const params = {
		      ..._params,
		      schemaPath: [..._params.schemaPath, schema],
		      path: _params.path
		    };
		    if (schema._zod.processJSONSchema) {
		      schema._zod.processJSONSchema(ctx, result.schema, params);
		    } else {
		      const _json = result.schema;
		      const processor = ctx.processors[def.type];
		      if (!processor) {
		        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
		      }
		      processor(schema, ctx, _json, params);
		    }
		    const parent = schema._zod.parent;
		    if (parent) {
		      if (!result.ref)
		        result.ref = parent;
		      process(parent, ctx, params);
		      ctx.seen.get(parent).isParent = true;
		    }
		  }
		  const meta3 = ctx.metadataRegistry.get(schema);
		  if (meta3)
		    Object.assign(result.schema, meta3);
		  if (ctx.io === "input" && isTransforming(schema)) {
		    delete result.schema.examples;
		    delete result.schema.default;
		  }
		  if (ctx.io === "input" && "_prefault" in result.schema)
		    (_a3 = result.schema).default ?? (_a3.default = result.schema._prefault);
		  delete result.schema._prefault;
		  const _result = ctx.seen.get(schema);
		  return _result.schema;
		}
		function extractDefs(ctx, schema) {
		  const root = ctx.seen.get(schema);
		  if (!root)
		    throw new Error("Unprocessed schema. This is a bug in Zod.");
		  const idToSchema = /* @__PURE__ */ new Map();
		  for (const entry of ctx.seen.entries()) {
		    const id = ctx.metadataRegistry.get(entry[0])?.id;
		    if (id) {
		      const existing = idToSchema.get(id);
		      if (existing && existing !== entry[0]) {
		        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
		      }
		      idToSchema.set(id, entry[0]);
		    }
		  }
		  const makeURI = (entry) => {
		    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		    if (ctx.external) {
		      const externalId = ctx.external.registry.get(entry[0])?.id;
		      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
		      if (externalId) {
		        return { ref: uriGenerator(externalId) };
		      }
		      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
		      entry[1].defId = id;
		      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
		    }
		    if (entry[1] === root) {
		      return { ref: "#" };
		    }
		    const uriPrefix = `#`;
		    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
		    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		    return { defId, ref: defUriPrefix + defId };
		  };
		  const extractToDef = (entry) => {
		    if (entry[1].schema.$ref) {
		      return;
		    }
		    const seen = entry[1];
		    const { ref, defId } = makeURI(entry);
		    seen.def = { ...seen.schema };
		    if (defId)
		      seen.defId = defId;
		    const schema2 = seen.schema;
		    for (const key in schema2) {
		      delete schema2[key];
		    }
		    schema2.$ref = ref;
		  };
		  if (ctx.cycles === "throw") {
		    for (const entry of ctx.seen.entries()) {
		      const seen = entry[1];
		      if (seen.cycle) {
		        throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

		Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
		      }
		    }
		  }
		  for (const entry of ctx.seen.entries()) {
		    const seen = entry[1];
		    if (schema === entry[0]) {
		      extractToDef(entry);
		      continue;
		    }
		    if (ctx.external) {
		      const ext = ctx.external.registry.get(entry[0])?.id;
		      if (schema !== entry[0] && ext) {
		        extractToDef(entry);
		        continue;
		      }
		    }
		    const id = ctx.metadataRegistry.get(entry[0])?.id;
		    if (id) {
		      extractToDef(entry);
		      continue;
		    }
		    if (seen.cycle) {
		      extractToDef(entry);
		      continue;
		    }
		    if (seen.count > 1) {
		      if (ctx.reused === "ref") {
		        extractToDef(entry);
		        continue;
		      }
		    }
		  }
		}
		function finalize(ctx, schema) {
		  const root = ctx.seen.get(schema);
		  if (!root)
		    throw new Error("Unprocessed schema. This is a bug in Zod.");
		  const flattenRef = (zodSchema) => {
		    const seen = ctx.seen.get(zodSchema);
		    if (seen.ref === null)
		      return;
		    const schema2 = seen.def ?? seen.schema;
		    const _cached = { ...schema2 };
		    const ref = seen.ref;
		    seen.ref = null;
		    if (ref) {
		      flattenRef(ref);
		      const refSeen = ctx.seen.get(ref);
		      const refSchema = refSeen.schema;
		      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
		        schema2.allOf = schema2.allOf ?? [];
		        schema2.allOf.push(refSchema);
		      } else {
		        Object.assign(schema2, refSchema);
		      }
		      Object.assign(schema2, _cached);
		      const isParentRef = zodSchema._zod.parent === ref;
		      if (isParentRef) {
		        for (const key in schema2) {
		          if (key === "$ref" || key === "allOf")
		            continue;
		          if (!(key in _cached)) {
		            delete schema2[key];
		          }
		        }
		      }
		      if (refSchema.$ref && refSeen.def) {
		        for (const key in schema2) {
		          if (key === "$ref" || key === "allOf")
		            continue;
		          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
		            delete schema2[key];
		          }
		        }
		      }
		    }
		    const parent = zodSchema._zod.parent;
		    if (parent && parent !== ref) {
		      flattenRef(parent);
		      const parentSeen = ctx.seen.get(parent);
		      if (parentSeen?.schema.$ref) {
		        schema2.$ref = parentSeen.schema.$ref;
		        if (parentSeen.def) {
		          for (const key in schema2) {
		            if (key === "$ref" || key === "allOf")
		              continue;
		            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
		              delete schema2[key];
		            }
		          }
		        }
		      }
		    }
		    ctx.override({
		      zodSchema,
		      jsonSchema: schema2,
		      path: seen.path ?? []
		    });
		  };
		  for (const entry of [...ctx.seen.entries()].reverse()) {
		    flattenRef(entry[0]);
		  }
		  const result = {};
		  if (ctx.target === "draft-2020-12") {
		    result.$schema = "https://json-schema.org/draft/2020-12/schema";
		  } else if (ctx.target === "draft-07") {
		    result.$schema = "http://json-schema.org/draft-07/schema#";
		  } else if (ctx.target === "draft-04") {
		    result.$schema = "http://json-schema.org/draft-04/schema#";
		  } else if (ctx.target === "openapi-3.0") {
		  } else {
		  }
		  if (ctx.external?.uri) {
		    const id = ctx.external.registry.get(schema)?.id;
		    if (!id)
		      throw new Error("Schema is missing an `id` property");
		    result.$id = ctx.external.uri(id);
		  }
		  Object.assign(result, root.def ?? root.schema);
		  const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
		  if (rootMetaId !== void 0 && result.id === rootMetaId)
		    delete result.id;
		  const defs = ctx.external?.defs ?? {};
		  for (const entry of ctx.seen.entries()) {
		    const seen = entry[1];
		    if (seen.def && seen.defId) {
		      if (seen.def.id === seen.defId)
		        delete seen.def.id;
		      defs[seen.defId] = seen.def;
		    }
		  }
		  if (ctx.external) {
		  } else {
		    if (Object.keys(defs).length > 0) {
		      if (ctx.target === "draft-2020-12") {
		        result.$defs = defs;
		      } else {
		        result.definitions = defs;
		      }
		    }
		  }
		  try {
		    const finalized = JSON.parse(JSON.stringify(result));
		    Object.defineProperty(finalized, "~standard", {
		      value: {
		        ...schema["~standard"],
		        jsonSchema: {
		          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
		          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
		        }
		      },
		      enumerable: false,
		      writable: false
		    });
		    return finalized;
		  } catch (_err) {
		    throw new Error("Error converting schema to JSON.");
		  }
		}
		function isTransforming(_schema, _ctx) {
		  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
		  if (ctx.seen.has(_schema))
		    return false;
		  ctx.seen.add(_schema);
		  const def = _schema._zod.def;
		  if (def.type === "transform")
		    return true;
		  if (def.type === "array")
		    return isTransforming(def.element, ctx);
		  if (def.type === "set")
		    return isTransforming(def.valueType, ctx);
		  if (def.type === "lazy")
		    return isTransforming(def.getter(), ctx);
		  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
		    return isTransforming(def.innerType, ctx);
		  }
		  if (def.type === "intersection") {
		    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
		  }
		  if (def.type === "record" || def.type === "map") {
		    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
		  }
		  if (def.type === "pipe") {
		    if (_schema._zod.traits.has("$ZodCodec"))
		      return true;
		    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
		  }
		  if (def.type === "object") {
		    for (const key in def.shape) {
		      if (isTransforming(def.shape[key], ctx))
		        return true;
		    }
		    return false;
		  }
		  if (def.type === "union") {
		    for (const option of def.options) {
		      if (isTransforming(option, ctx))
		        return true;
		    }
		    return false;
		  }
		  if (def.type === "tuple") {
		    for (const item of def.items) {
		      if (isTransforming(item, ctx))
		        return true;
		    }
		    if (def.rest && isTransforming(def.rest, ctx))
		      return true;
		    return false;
		  }
		  return false;
		}
		var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
		  const ctx = initializeContext({ ...params, processors });
		  process(schema, ctx);
		  extractDefs(ctx, schema);
		  return finalize(ctx, schema);
		};
		var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
		  const { libraryOptions, target } = params ?? {};
		  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
		  process(schema, ctx);
		  extractDefs(ctx, schema);
		  return finalize(ctx, schema);
		};

		// node_modules/zod/v4/core/json-schema-processors.js
		var formatMap = {
		  guid: "uuid",
		  url: "uri",
		  datetime: "date-time",
		  json_string: "json-string",
		  regex: ""
		  // do not set
		};
		var stringProcessor = (schema, ctx, _json, _params) => {
		  const json2 = _json;
		  json2.type = "string";
		  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
		  if (typeof minimum === "number")
		    json2.minLength = minimum;
		  if (typeof maximum === "number")
		    json2.maxLength = maximum;
		  if (format) {
		    json2.format = formatMap[format] ?? format;
		    if (json2.format === "")
		      delete json2.format;
		    if (format === "time") {
		      delete json2.format;
		    }
		  }
		  if (contentEncoding)
		    json2.contentEncoding = contentEncoding;
		  if (patterns && patterns.size > 0) {
		    const regexes = [...patterns];
		    if (regexes.length === 1)
		      json2.pattern = regexes[0].source;
		    else if (regexes.length > 1) {
		      json2.allOf = [
		        ...regexes.map((regex) => ({
		          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
		          pattern: regex.source
		        }))
		      ];
		    }
		  }
		};
		var numberProcessor = (schema, ctx, _json, _params) => {
		  const json2 = _json;
		  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
		  if (typeof format === "string" && format.includes("int"))
		    json2.type = "integer";
		  else
		    json2.type = "number";
		  const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
		  const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
		  const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
		  if (exMin) {
		    if (legacy) {
		      json2.minimum = exclusiveMinimum;
		      json2.exclusiveMinimum = true;
		    } else {
		      json2.exclusiveMinimum = exclusiveMinimum;
		    }
		  } else if (typeof minimum === "number") {
		    json2.minimum = minimum;
		  }
		  if (exMax) {
		    if (legacy) {
		      json2.maximum = exclusiveMaximum;
		      json2.exclusiveMaximum = true;
		    } else {
		      json2.exclusiveMaximum = exclusiveMaximum;
		    }
		  } else if (typeof maximum === "number") {
		    json2.maximum = maximum;
		  }
		  if (typeof multipleOf === "number")
		    json2.multipleOf = multipleOf;
		};
		var booleanProcessor = (_schema, _ctx, json2, _params) => {
		  json2.type = "boolean";
		};
		var bigintProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("BigInt cannot be represented in JSON Schema");
		  }
		};
		var symbolProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Symbols cannot be represented in JSON Schema");
		  }
		};
		var nullProcessor = (_schema, ctx, json2, _params) => {
		  if (ctx.target === "openapi-3.0") {
		    json2.type = "string";
		    json2.nullable = true;
		    json2.enum = [null];
		  } else {
		    json2.type = "null";
		  }
		};
		var undefinedProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Undefined cannot be represented in JSON Schema");
		  }
		};
		var voidProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Void cannot be represented in JSON Schema");
		  }
		};
		var neverProcessor = (_schema, _ctx, json2, _params) => {
		  json2.not = {};
		};
		var anyProcessor = (_schema, _ctx, _json, _params) => {
		};
		var unknownProcessor = (_schema, _ctx, _json, _params) => {
		};
		var dateProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Date cannot be represented in JSON Schema");
		  }
		};
		var enumProcessor = (schema, _ctx, json2, _params) => {
		  const def = schema._zod.def;
		  const values = getEnumValues(def.entries);
		  if (values.every((v) => typeof v === "number"))
		    json2.type = "number";
		  if (values.every((v) => typeof v === "string"))
		    json2.type = "string";
		  json2.enum = values;
		};
		var literalProcessor = (schema, ctx, json2, _params) => {
		  const def = schema._zod.def;
		  const vals = [];
		  for (const val of def.values) {
		    if (val === void 0) {
		      if (ctx.unrepresentable === "throw") {
		        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
		      } else {
		      }
		    } else if (typeof val === "bigint") {
		      if (ctx.unrepresentable === "throw") {
		        throw new Error("BigInt literals cannot be represented in JSON Schema");
		      } else {
		        vals.push(Number(val));
		      }
		    } else {
		      vals.push(val);
		    }
		  }
		  if (vals.length === 0) {
		  } else if (vals.length === 1) {
		    const val = vals[0];
		    json2.type = val === null ? "null" : typeof val;
		    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
		      json2.enum = [val];
		    } else {
		      json2.const = val;
		    }
		  } else {
		    if (vals.every((v) => typeof v === "number"))
		      json2.type = "number";
		    if (vals.every((v) => typeof v === "string"))
		      json2.type = "string";
		    if (vals.every((v) => typeof v === "boolean"))
		      json2.type = "boolean";
		    if (vals.every((v) => v === null))
		      json2.type = "null";
		    json2.enum = vals;
		  }
		};
		var nanProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("NaN cannot be represented in JSON Schema");
		  }
		};
		var templateLiteralProcessor = (schema, _ctx, json2, _params) => {
		  const _json = json2;
		  const pattern = schema._zod.pattern;
		  if (!pattern)
		    throw new Error("Pattern not found in template literal");
		  _json.type = "string";
		  _json.pattern = pattern.source;
		};
		var fileProcessor = (schema, _ctx, json2, _params) => {
		  const _json = json2;
		  const file2 = {
		    type: "string",
		    format: "binary",
		    contentEncoding: "binary"
		  };
		  const { minimum, maximum, mime } = schema._zod.bag;
		  if (minimum !== void 0)
		    file2.minLength = minimum;
		  if (maximum !== void 0)
		    file2.maxLength = maximum;
		  if (mime) {
		    if (mime.length === 1) {
		      file2.contentMediaType = mime[0];
		      Object.assign(_json, file2);
		    } else {
		      Object.assign(_json, file2);
		      _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
		    }
		  } else {
		    Object.assign(_json, file2);
		  }
		};
		var successProcessor = (_schema, _ctx, json2, _params) => {
		  json2.type = "boolean";
		};
		var customProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Custom types cannot be represented in JSON Schema");
		  }
		};
		var functionProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Function types cannot be represented in JSON Schema");
		  }
		};
		var transformProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Transforms cannot be represented in JSON Schema");
		  }
		};
		var mapProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Map cannot be represented in JSON Schema");
		  }
		};
		var setProcessor = (_schema, ctx, _json, _params) => {
		  if (ctx.unrepresentable === "throw") {
		    throw new Error("Set cannot be represented in JSON Schema");
		  }
		};
		var arrayProcessor = (schema, ctx, _json, params) => {
		  const json2 = _json;
		  const def = schema._zod.def;
		  const { minimum, maximum } = schema._zod.bag;
		  if (typeof minimum === "number")
		    json2.minItems = minimum;
		  if (typeof maximum === "number")
		    json2.maxItems = maximum;
		  json2.type = "array";
		  json2.items = process(def.element, ctx, {
		    ...params,
		    path: [...params.path, "items"]
		  });
		};
		var objectProcessor = (schema, ctx, _json, params) => {
		  const json2 = _json;
		  const def = schema._zod.def;
		  json2.type = "object";
		  json2.properties = {};
		  const shape = def.shape;
		  for (const key in shape) {
		    json2.properties[key] = process(shape[key], ctx, {
		      ...params,
		      path: [...params.path, "properties", key]
		    });
		  }
		  const allKeys = new Set(Object.keys(shape));
		  const requiredKeys = new Set([...allKeys].filter((key) => {
		    const v = def.shape[key]._zod;
		    if (ctx.io === "input") {
		      return v.optin === void 0;
		    } else {
		      return v.optout === void 0;
		    }
		  }));
		  if (requiredKeys.size > 0) {
		    json2.required = Array.from(requiredKeys);
		  }
		  if (def.catchall?._zod.def.type === "never") {
		    json2.additionalProperties = false;
		  } else if (!def.catchall) {
		    if (ctx.io === "output")
		      json2.additionalProperties = false;
		  } else if (def.catchall) {
		    json2.additionalProperties = process(def.catchall, ctx, {
		      ...params,
		      path: [...params.path, "additionalProperties"]
		    });
		  }
		};
		var unionProcessor = (schema, ctx, json2, params) => {
		  const def = schema._zod.def;
		  const isExclusive = def.inclusive === false;
		  const options = def.options.map((x, i) => process(x, ctx, {
		    ...params,
		    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
		  }));
		  if (isExclusive) {
		    json2.oneOf = options;
		  } else {
		    json2.anyOf = options;
		  }
		};
		var intersectionProcessor = (schema, ctx, json2, params) => {
		  const def = schema._zod.def;
		  const a = process(def.left, ctx, {
		    ...params,
		    path: [...params.path, "allOf", 0]
		  });
		  const b = process(def.right, ctx, {
		    ...params,
		    path: [...params.path, "allOf", 1]
		  });
		  const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
		  const allOf = [
		    ...isSimpleIntersection(a) ? a.allOf : [a],
		    ...isSimpleIntersection(b) ? b.allOf : [b]
		  ];
		  json2.allOf = allOf;
		};
		var tupleProcessor = (schema, ctx, _json, params) => {
		  const json2 = _json;
		  const def = schema._zod.def;
		  json2.type = "array";
		  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
		  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
		  const prefixItems = def.items.map((x, i) => process(x, ctx, {
		    ...params,
		    path: [...params.path, prefixPath, i]
		  }));
		  const rest = def.rest ? process(def.rest, ctx, {
		    ...params,
		    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
		  }) : null;
		  if (ctx.target === "draft-2020-12") {
		    json2.prefixItems = prefixItems;
		    if (rest) {
		      json2.items = rest;
		    }
		  } else if (ctx.target === "openapi-3.0") {
		    json2.items = {
		      anyOf: prefixItems
		    };
		    if (rest) {
		      json2.items.anyOf.push(rest);
		    }
		    json2.minItems = prefixItems.length;
		    if (!rest) {
		      json2.maxItems = prefixItems.length;
		    }
		  } else {
		    json2.items = prefixItems;
		    if (rest) {
		      json2.additionalItems = rest;
		    }
		  }
		  const { minimum, maximum } = schema._zod.bag;
		  if (typeof minimum === "number")
		    json2.minItems = minimum;
		  if (typeof maximum === "number")
		    json2.maxItems = maximum;
		};
		var recordProcessor = (schema, ctx, _json, params) => {
		  const json2 = _json;
		  const def = schema._zod.def;
		  json2.type = "object";
		  const keyType = def.keyType;
		  const keyBag = keyType._zod.bag;
		  const patterns = keyBag?.patterns;
		  if (def.mode === "loose" && patterns && patterns.size > 0) {
		    const valueSchema = process(def.valueType, ctx, {
		      ...params,
		      path: [...params.path, "patternProperties", "*"]
		    });
		    json2.patternProperties = {};
		    for (const pattern of patterns) {
		      json2.patternProperties[pattern.source] = valueSchema;
		    }
		  } else {
		    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
		      json2.propertyNames = process(def.keyType, ctx, {
		        ...params,
		        path: [...params.path, "propertyNames"]
		      });
		    }
		    json2.additionalProperties = process(def.valueType, ctx, {
		      ...params,
		      path: [...params.path, "additionalProperties"]
		    });
		  }
		  const keyValues = keyType._zod.values;
		  if (keyValues) {
		    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
		    if (validKeyValues.length > 0) {
		      json2.required = validKeyValues;
		    }
		  }
		};
		var nullableProcessor = (schema, ctx, json2, params) => {
		  const def = schema._zod.def;
		  const inner = process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  if (ctx.target === "openapi-3.0") {
		    seen.ref = def.innerType;
		    json2.nullable = true;
		  } else {
		    json2.anyOf = [inner, { type: "null" }];
		  }
		};
		var nonoptionalProcessor = (schema, ctx, _json, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		};
		var defaultProcessor = (schema, ctx, json2, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		  json2.default = JSON.parse(JSON.stringify(def.defaultValue));
		};
		var prefaultProcessor = (schema, ctx, json2, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		  if (ctx.io === "input")
		    json2._prefault = JSON.parse(JSON.stringify(def.defaultValue));
		};
		var catchProcessor = (schema, ctx, json2, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		  let catchValue;
		  try {
		    catchValue = def.catchValue(void 0);
		  } catch {
		    throw new Error("Dynamic catch values are not supported in JSON Schema");
		  }
		  json2.default = catchValue;
		};
		var pipeProcessor = (schema, ctx, _json, params) => {
		  const def = schema._zod.def;
		  const inIsTransform = def.in._zod.traits.has("$ZodTransform");
		  const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
		  process(innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = innerType;
		};
		var readonlyProcessor = (schema, ctx, json2, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		  json2.readOnly = true;
		};
		var promiseProcessor = (schema, ctx, _json, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		};
		var optionalProcessor = (schema, ctx, _json, params) => {
		  const def = schema._zod.def;
		  process(def.innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = def.innerType;
		};
		var lazyProcessor = (schema, ctx, _json, params) => {
		  const innerType = schema._zod.innerType;
		  process(innerType, ctx, params);
		  const seen = ctx.seen.get(schema);
		  seen.ref = innerType;
		};
		var allProcessors = {
		  string: stringProcessor,
		  number: numberProcessor,
		  boolean: booleanProcessor,
		  bigint: bigintProcessor,
		  symbol: symbolProcessor,
		  null: nullProcessor,
		  undefined: undefinedProcessor,
		  void: voidProcessor,
		  never: neverProcessor,
		  any: anyProcessor,
		  unknown: unknownProcessor,
		  date: dateProcessor,
		  enum: enumProcessor,
		  literal: literalProcessor,
		  nan: nanProcessor,
		  template_literal: templateLiteralProcessor,
		  file: fileProcessor,
		  success: successProcessor,
		  custom: customProcessor,
		  function: functionProcessor,
		  transform: transformProcessor,
		  map: mapProcessor,
		  set: setProcessor,
		  array: arrayProcessor,
		  object: objectProcessor,
		  union: unionProcessor,
		  intersection: intersectionProcessor,
		  tuple: tupleProcessor,
		  record: recordProcessor,
		  nullable: nullableProcessor,
		  nonoptional: nonoptionalProcessor,
		  default: defaultProcessor,
		  prefault: prefaultProcessor,
		  catch: catchProcessor,
		  pipe: pipeProcessor,
		  readonly: readonlyProcessor,
		  promise: promiseProcessor,
		  optional: optionalProcessor,
		  lazy: lazyProcessor
		};
		function toJSONSchema(input, params) {
		  if ("_idmap" in input) {
		    const registry2 = input;
		    const ctx2 = initializeContext({ ...params, processors: allProcessors });
		    const defs = {};
		    for (const entry of registry2._idmap.entries()) {
		      const [_, schema] = entry;
		      process(schema, ctx2);
		    }
		    const schemas = {};
		    const external = {
		      registry: registry2,
		      uri: params?.uri,
		      defs
		    };
		    ctx2.external = external;
		    for (const entry of registry2._idmap.entries()) {
		      const [key, schema] = entry;
		      extractDefs(ctx2, schema);
		      schemas[key] = finalize(ctx2, schema);
		    }
		    if (Object.keys(defs).length > 0) {
		      const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
		      schemas.__shared = {
		        [defsSegment]: defs
		      };
		    }
		    return { schemas };
		  }
		  const ctx = initializeContext({ ...params, processors: allProcessors });
		  process(input, ctx);
		  extractDefs(ctx, input);
		  return finalize(ctx, input);
		}

		// node_modules/zod/v4/core/json-schema-generator.js
		var JSONSchemaGenerator = class {
		  /** @deprecated Access via ctx instead */
		  get metadataRegistry() {
		    return this.ctx.metadataRegistry;
		  }
		  /** @deprecated Access via ctx instead */
		  get target() {
		    return this.ctx.target;
		  }
		  /** @deprecated Access via ctx instead */
		  get unrepresentable() {
		    return this.ctx.unrepresentable;
		  }
		  /** @deprecated Access via ctx instead */
		  get override() {
		    return this.ctx.override;
		  }
		  /** @deprecated Access via ctx instead */
		  get io() {
		    return this.ctx.io;
		  }
		  /** @deprecated Access via ctx instead */
		  get counter() {
		    return this.ctx.counter;
		  }
		  set counter(value) {
		    this.ctx.counter = value;
		  }
		  /** @deprecated Access via ctx instead */
		  get seen() {
		    return this.ctx.seen;
		  }
		  constructor(params) {
		    let normalizedTarget = params?.target ?? "draft-2020-12";
		    if (normalizedTarget === "draft-4")
		      normalizedTarget = "draft-04";
		    if (normalizedTarget === "draft-7")
		      normalizedTarget = "draft-07";
		    this.ctx = initializeContext({
		      processors: allProcessors,
		      target: normalizedTarget,
		      ...params?.metadata && { metadata: params.metadata },
		      ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
		      ...params?.override && { override: params.override },
		      ...params?.io && { io: params.io }
		    });
		  }
		  /**
		   * Process a schema to prepare it for JSON Schema generation.
		   * This must be called before emit().
		   */
		  process(schema, _params = { path: [], schemaPath: [] }) {
		    return process(schema, this.ctx, _params);
		  }
		  /**
		   * Emit the final JSON Schema after processing.
		   * Must call process() first.
		   */
		  emit(schema, _params) {
		    if (_params) {
		      if (_params.cycles)
		        this.ctx.cycles = _params.cycles;
		      if (_params.reused)
		        this.ctx.reused = _params.reused;
		      if (_params.external)
		        this.ctx.external = _params.external;
		    }
		    extractDefs(this.ctx, schema);
		    const result = finalize(this.ctx, schema);
		    const { "~standard": _, ...plainResult } = result;
		    return plainResult;
		  }
		};

		// node_modules/zod/v4/core/json-schema.js
		var json_schema_exports = {};

		// node_modules/zod/v4/classic/schemas.js
		var schemas_exports2 = {};
		__export(schemas_exports2, {
		  ZodAny: () => ZodAny,
		  ZodArray: () => ZodArray,
		  ZodBase64: () => ZodBase64,
		  ZodBase64URL: () => ZodBase64URL,
		  ZodBigInt: () => ZodBigInt,
		  ZodBigIntFormat: () => ZodBigIntFormat,
		  ZodBoolean: () => ZodBoolean,
		  ZodCIDRv4: () => ZodCIDRv4,
		  ZodCIDRv6: () => ZodCIDRv6,
		  ZodCUID: () => ZodCUID,
		  ZodCUID2: () => ZodCUID2,
		  ZodCatch: () => ZodCatch,
		  ZodCodec: () => ZodCodec,
		  ZodCustom: () => ZodCustom,
		  ZodCustomStringFormat: () => ZodCustomStringFormat,
		  ZodDate: () => ZodDate,
		  ZodDefault: () => ZodDefault,
		  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
		  ZodE164: () => ZodE164,
		  ZodEmail: () => ZodEmail,
		  ZodEmoji: () => ZodEmoji,
		  ZodEnum: () => ZodEnum,
		  ZodExactOptional: () => ZodExactOptional,
		  ZodFile: () => ZodFile,
		  ZodFunction: () => ZodFunction,
		  ZodGUID: () => ZodGUID,
		  ZodIPv4: () => ZodIPv4,
		  ZodIPv6: () => ZodIPv6,
		  ZodIntersection: () => ZodIntersection,
		  ZodJWT: () => ZodJWT,
		  ZodKSUID: () => ZodKSUID,
		  ZodLazy: () => ZodLazy,
		  ZodLiteral: () => ZodLiteral,
		  ZodMAC: () => ZodMAC,
		  ZodMap: () => ZodMap,
		  ZodNaN: () => ZodNaN,
		  ZodNanoID: () => ZodNanoID,
		  ZodNever: () => ZodNever,
		  ZodNonOptional: () => ZodNonOptional,
		  ZodNull: () => ZodNull,
		  ZodNullable: () => ZodNullable,
		  ZodNumber: () => ZodNumber,
		  ZodNumberFormat: () => ZodNumberFormat,
		  ZodObject: () => ZodObject,
		  ZodOptional: () => ZodOptional,
		  ZodPipe: () => ZodPipe,
		  ZodPrefault: () => ZodPrefault,
		  ZodPreprocess: () => ZodPreprocess,
		  ZodPromise: () => ZodPromise,
		  ZodReadonly: () => ZodReadonly,
		  ZodRecord: () => ZodRecord,
		  ZodSet: () => ZodSet,
		  ZodString: () => ZodString,
		  ZodStringFormat: () => ZodStringFormat,
		  ZodSuccess: () => ZodSuccess,
		  ZodSymbol: () => ZodSymbol,
		  ZodTemplateLiteral: () => ZodTemplateLiteral,
		  ZodTransform: () => ZodTransform,
		  ZodTuple: () => ZodTuple,
		  ZodType: () => ZodType,
		  ZodULID: () => ZodULID,
		  ZodURL: () => ZodURL,
		  ZodUUID: () => ZodUUID,
		  ZodUndefined: () => ZodUndefined,
		  ZodUnion: () => ZodUnion,
		  ZodUnknown: () => ZodUnknown,
		  ZodVoid: () => ZodVoid,
		  ZodXID: () => ZodXID,
		  ZodXor: () => ZodXor,
		  _ZodString: () => _ZodString,
		  _default: () => _default2,
		  _function: () => _function,
		  any: () => any,
		  array: () => array,
		  base64: () => base642,
		  base64url: () => base64url2,
		  bigint: () => bigint2,
		  boolean: () => boolean2,
		  catch: () => _catch2,
		  check: () => check,
		  cidrv4: () => cidrv42,
		  cidrv6: () => cidrv62,
		  codec: () => codec,
		  cuid: () => cuid3,
		  cuid2: () => cuid22,
		  custom: () => custom,
		  date: () => date3,
		  describe: () => describe2,
		  discriminatedUnion: () => discriminatedUnion,
		  e164: () => e1642,
		  email: () => email2,
		  emoji: () => emoji2,
		  enum: () => _enum2,
		  exactOptional: () => exactOptional,
		  file: () => file,
		  float32: () => float32,
		  float64: () => float64,
		  function: () => _function,
		  guid: () => guid2,
		  hash: () => hash,
		  hex: () => hex2,
		  hostname: () => hostname2,
		  httpUrl: () => httpUrl,
		  instanceof: () => _instanceof,
		  int: () => int,
		  int32: () => int32,
		  int64: () => int64,
		  intersection: () => intersection,
		  invertCodec: () => invertCodec,
		  ipv4: () => ipv42,
		  ipv6: () => ipv62,
		  json: () => json,
		  jwt: () => jwt,
		  keyof: () => keyof,
		  ksuid: () => ksuid2,
		  lazy: () => lazy,
		  literal: () => literal,
		  looseObject: () => looseObject,
		  looseRecord: () => looseRecord,
		  mac: () => mac2,
		  map: () => map,
		  meta: () => meta2,
		  nan: () => nan,
		  nanoid: () => nanoid2,
		  nativeEnum: () => nativeEnum,
		  never: () => never,
		  nonoptional: () => nonoptional,
		  null: () => _null3,
		  nullable: () => nullable,
		  nullish: () => nullish2,
		  number: () => number2,
		  object: () => object,
		  optional: () => optional,
		  partialRecord: () => partialRecord,
		  pipe: () => pipe,
		  prefault: () => prefault,
		  preprocess: () => preprocess,
		  promise: () => promise,
		  readonly: () => readonly,
		  record: () => record,
		  refine: () => refine,
		  set: () => set,
		  strictObject: () => strictObject,
		  string: () => string2,
		  stringFormat: () => stringFormat,
		  stringbool: () => stringbool,
		  success: () => success,
		  superRefine: () => superRefine,
		  symbol: () => symbol,
		  templateLiteral: () => templateLiteral,
		  transform: () => transform,
		  tuple: () => tuple,
		  uint32: () => uint32,
		  uint64: () => uint64,
		  ulid: () => ulid2,
		  undefined: () => _undefined3,
		  union: () => union,
		  unknown: () => unknown,
		  url: () => url,
		  uuid: () => uuid2,
		  uuidv4: () => uuidv4,
		  uuidv6: () => uuidv6,
		  uuidv7: () => uuidv7,
		  void: () => _void2,
		  xid: () => xid2,
		  xor: () => xor
		});

		// node_modules/zod/v4/classic/checks.js
		var checks_exports2 = {};
		__export(checks_exports2, {
		  endsWith: () => _endsWith,
		  gt: () => _gt,
		  gte: () => _gte,
		  includes: () => _includes,
		  length: () => _length,
		  lowercase: () => _lowercase,
		  lt: () => _lt,
		  lte: () => _lte,
		  maxLength: () => _maxLength,
		  maxSize: () => _maxSize,
		  mime: () => _mime,
		  minLength: () => _minLength,
		  minSize: () => _minSize,
		  multipleOf: () => _multipleOf,
		  negative: () => _negative,
		  nonnegative: () => _nonnegative,
		  nonpositive: () => _nonpositive,
		  normalize: () => _normalize,
		  overwrite: () => _overwrite,
		  positive: () => _positive,
		  property: () => _property,
		  regex: () => _regex,
		  size: () => _size,
		  slugify: () => _slugify,
		  startsWith: () => _startsWith,
		  toLowerCase: () => _toLowerCase,
		  toUpperCase: () => _toUpperCase,
		  trim: () => _trim,
		  uppercase: () => _uppercase
		});

		// node_modules/zod/v4/classic/iso.js
		var iso_exports = {};
		__export(iso_exports, {
		  ZodISODate: () => ZodISODate,
		  ZodISODateTime: () => ZodISODateTime,
		  ZodISODuration: () => ZodISODuration,
		  ZodISOTime: () => ZodISOTime,
		  date: () => date2,
		  datetime: () => datetime2,
		  duration: () => duration2,
		  time: () => time2
		});
		var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
		  $ZodISODateTime.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function datetime2(params) {
		  return _isoDateTime(ZodISODateTime, params);
		}
		var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
		  $ZodISODate.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function date2(params) {
		  return _isoDate(ZodISODate, params);
		}
		var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
		  $ZodISOTime.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function time2(params) {
		  return _isoTime(ZodISOTime, params);
		}
		var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
		  $ZodISODuration.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function duration2(params) {
		  return _isoDuration(ZodISODuration, params);
		}

		// node_modules/zod/v4/classic/errors.js
		var initializer2 = (inst, issues) => {
		  $ZodError.init(inst, issues);
		  inst.name = "ZodError";
		  Object.defineProperties(inst, {
		    format: {
		      value: (mapper) => formatError(inst, mapper)
		      // enumerable: false,
		    },
		    flatten: {
		      value: (mapper) => flattenError(inst, mapper)
		      // enumerable: false,
		    },
		    addIssue: {
		      value: (issue2) => {
		        inst.issues.push(issue2);
		        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		      }
		      // enumerable: false,
		    },
		    addIssues: {
		      value: (issues2) => {
		        inst.issues.push(...issues2);
		        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		      }
		      // enumerable: false,
		    },
		    isEmpty: {
		      get() {
		        return inst.issues.length === 0;
		      }
		      // enumerable: false,
		    }
		  });
		};
		var ZodError = /* @__PURE__ */ $constructor("ZodError", initializer2);
		var ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, {
		  Parent: Error
		});

		// node_modules/zod/v4/classic/parse.js
		var parse2 = /* @__PURE__ */ _parse(ZodRealError);
		var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
		var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
		var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		var encode2 = /* @__PURE__ */ _encode(ZodRealError);
		var decode2 = /* @__PURE__ */ _decode(ZodRealError);
		var encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
		var decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
		var safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
		var safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
		var safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		var safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

		// node_modules/zod/v4/classic/schemas.js
		var _installedGroups = /* @__PURE__ */ new WeakMap();
		function _installLazyMethods(inst, group, methods) {
		  const proto = Object.getPrototypeOf(inst);
		  let installed = _installedGroups.get(proto);
		  if (!installed) {
		    installed = /* @__PURE__ */ new Set();
		    _installedGroups.set(proto, installed);
		  }
		  if (installed.has(group))
		    return;
		  installed.add(group);
		  for (const key in methods) {
		    const fn = methods[key];
		    Object.defineProperty(proto, key, {
		      configurable: true,
		      enumerable: false,
		      get() {
		        const bound = fn.bind(this);
		        Object.defineProperty(this, key, {
		          configurable: true,
		          writable: true,
		          enumerable: true,
		          value: bound
		        });
		        return bound;
		      },
		      set(v) {
		        Object.defineProperty(this, key, {
		          configurable: true,
		          writable: true,
		          enumerable: true,
		          value: v
		        });
		      }
		    });
		  }
		}
		var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
		  $ZodType.init(inst, def);
		  Object.assign(inst["~standard"], {
		    jsonSchema: {
		      input: createStandardJSONSchemaMethod(inst, "input"),
		      output: createStandardJSONSchemaMethod(inst, "output")
		    }
		  });
		  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
		  inst.def = def;
		  inst.type = def.type;
		  Object.defineProperty(inst, "_def", { value: def });
		  inst.parse = (data, params) => parse2(inst, data, params, { callee: inst.parse });
		  inst.safeParse = (data, params) => safeParse2(inst, data, params);
		  inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
		  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
		  inst.spa = inst.safeParseAsync;
		  inst.encode = (data, params) => encode2(inst, data, params);
		  inst.decode = (data, params) => decode2(inst, data, params);
		  inst.encodeAsync = async (data, params) => encodeAsync2(inst, data, params);
		  inst.decodeAsync = async (data, params) => decodeAsync2(inst, data, params);
		  inst.safeEncode = (data, params) => safeEncode2(inst, data, params);
		  inst.safeDecode = (data, params) => safeDecode2(inst, data, params);
		  inst.safeEncodeAsync = async (data, params) => safeEncodeAsync2(inst, data, params);
		  inst.safeDecodeAsync = async (data, params) => safeDecodeAsync2(inst, data, params);
		  _installLazyMethods(inst, "ZodType", {
		    check(...chks) {
		      const def2 = this.def;
		      return this.clone(util_exports.mergeDefs(def2, {
		        checks: [
		          ...def2.checks ?? [],
		          ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
		        ]
		      }), { parent: true });
		    },
		    with(...chks) {
		      return this.check(...chks);
		    },
		    clone(def2, params) {
		      return clone(this, def2, params);
		    },
		    brand() {
		      return this;
		    },
		    register(reg, meta3) {
		      reg.add(this, meta3);
		      return this;
		    },
		    refine(check2, params) {
		      return this.check(refine(check2, params));
		    },
		    superRefine(refinement, params) {
		      return this.check(superRefine(refinement, params));
		    },
		    overwrite(fn) {
		      return this.check(_overwrite(fn));
		    },
		    optional() {
		      return optional(this);
		    },
		    exactOptional() {
		      return exactOptional(this);
		    },
		    nullable() {
		      return nullable(this);
		    },
		    nullish() {
		      return optional(nullable(this));
		    },
		    nonoptional(params) {
		      return nonoptional(this, params);
		    },
		    array() {
		      return array(this);
		    },
		    or(arg) {
		      return union([this, arg]);
		    },
		    and(arg) {
		      return intersection(this, arg);
		    },
		    transform(tx) {
		      return pipe(this, transform(tx));
		    },
		    default(d) {
		      return _default2(this, d);
		    },
		    prefault(d) {
		      return prefault(this, d);
		    },
		    catch(params) {
		      return _catch2(this, params);
		    },
		    pipe(target) {
		      return pipe(this, target);
		    },
		    readonly() {
		      return readonly(this);
		    },
		    describe(description) {
		      const cl = this.clone();
		      globalRegistry.add(cl, { description });
		      return cl;
		    },
		    meta(...args) {
		      if (args.length === 0)
		        return globalRegistry.get(this);
		      const cl = this.clone();
		      globalRegistry.add(cl, args[0]);
		      return cl;
		    },
		    isOptional() {
		      return this.safeParse(void 0).success;
		    },
		    isNullable() {
		      return this.safeParse(null).success;
		    },
		    apply(fn) {
		      return fn(this);
		    }
		  });
		  Object.defineProperty(inst, "description", {
		    get() {
		      return globalRegistry.get(inst)?.description;
		    },
		    configurable: true
		  });
		  return inst;
		});
		var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
		  $ZodString.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => stringProcessor(inst, ctx, json2, params);
		  const bag = inst._zod.bag;
		  inst.format = bag.format ?? null;
		  inst.minLength = bag.minimum ?? null;
		  inst.maxLength = bag.maximum ?? null;
		  _installLazyMethods(inst, "_ZodString", {
		    regex(...args) {
		      return this.check(_regex(...args));
		    },
		    includes(...args) {
		      return this.check(_includes(...args));
		    },
		    startsWith(...args) {
		      return this.check(_startsWith(...args));
		    },
		    endsWith(...args) {
		      return this.check(_endsWith(...args));
		    },
		    min(...args) {
		      return this.check(_minLength(...args));
		    },
		    max(...args) {
		      return this.check(_maxLength(...args));
		    },
		    length(...args) {
		      return this.check(_length(...args));
		    },
		    nonempty(...args) {
		      return this.check(_minLength(1, ...args));
		    },
		    lowercase(params) {
		      return this.check(_lowercase(params));
		    },
		    uppercase(params) {
		      return this.check(_uppercase(params));
		    },
		    trim() {
		      return this.check(_trim());
		    },
		    normalize(...args) {
		      return this.check(_normalize(...args));
		    },
		    toLowerCase() {
		      return this.check(_toLowerCase());
		    },
		    toUpperCase() {
		      return this.check(_toUpperCase());
		    },
		    slugify() {
		      return this.check(_slugify());
		    }
		  });
		});
		var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
		  $ZodString.init(inst, def);
		  _ZodString.init(inst, def);
		  inst.email = (params) => inst.check(_email(ZodEmail, params));
		  inst.url = (params) => inst.check(_url(ZodURL, params));
		  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
		  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
		  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
		  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
		  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
		  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
		  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
		  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
		  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
		  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
		  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
		  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
		  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
		  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
		  inst.xid = (params) => inst.check(_xid(ZodXID, params));
		  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
		  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
		  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
		  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
		  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
		  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
		  inst.datetime = (params) => inst.check(datetime2(params));
		  inst.date = (params) => inst.check(date2(params));
		  inst.time = (params) => inst.check(time2(params));
		  inst.duration = (params) => inst.check(duration2(params));
		});
		function string2(params) {
		  return _string(ZodString, params);
		}
		var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
		  $ZodStringFormat.init(inst, def);
		  _ZodString.init(inst, def);
		});
		var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
		  $ZodEmail.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function email2(params) {
		  return _email(ZodEmail, params);
		}
		var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
		  $ZodGUID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function guid2(params) {
		  return _guid(ZodGUID, params);
		}
		var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
		  $ZodUUID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function uuid2(params) {
		  return _uuid(ZodUUID, params);
		}
		function uuidv4(params) {
		  return _uuidv4(ZodUUID, params);
		}
		function uuidv6(params) {
		  return _uuidv6(ZodUUID, params);
		}
		function uuidv7(params) {
		  return _uuidv7(ZodUUID, params);
		}
		var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
		  $ZodURL.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function url(params) {
		  return _url(ZodURL, params);
		}
		function httpUrl(params) {
		  return _url(ZodURL, {
		    protocol: regexes_exports.httpProtocol,
		    hostname: regexes_exports.domain,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
		  $ZodEmoji.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function emoji2(params) {
		  return _emoji2(ZodEmoji, params);
		}
		var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
		  $ZodNanoID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function nanoid2(params) {
		  return _nanoid(ZodNanoID, params);
		}
		var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
		  $ZodCUID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function cuid3(params) {
		  return _cuid(ZodCUID, params);
		}
		var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
		  $ZodCUID2.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function cuid22(params) {
		  return _cuid2(ZodCUID2, params);
		}
		var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
		  $ZodULID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function ulid2(params) {
		  return _ulid(ZodULID, params);
		}
		var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
		  $ZodXID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function xid2(params) {
		  return _xid(ZodXID, params);
		}
		var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
		  $ZodKSUID.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function ksuid2(params) {
		  return _ksuid(ZodKSUID, params);
		}
		var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
		  $ZodIPv4.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function ipv42(params) {
		  return _ipv4(ZodIPv4, params);
		}
		var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
		  $ZodMAC.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function mac2(params) {
		  return _mac(ZodMAC, params);
		}
		var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
		  $ZodIPv6.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function ipv62(params) {
		  return _ipv6(ZodIPv6, params);
		}
		var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
		  $ZodCIDRv4.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function cidrv42(params) {
		  return _cidrv4(ZodCIDRv4, params);
		}
		var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
		  $ZodCIDRv6.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function cidrv62(params) {
		  return _cidrv6(ZodCIDRv6, params);
		}
		var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
		  $ZodBase64.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function base642(params) {
		  return _base64(ZodBase64, params);
		}
		var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
		  $ZodBase64URL.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function base64url2(params) {
		  return _base64url(ZodBase64URL, params);
		}
		var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
		  $ZodE164.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function e1642(params) {
		  return _e164(ZodE164, params);
		}
		var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
		  $ZodJWT.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function jwt(params) {
		  return _jwt(ZodJWT, params);
		}
		var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
		  $ZodCustomStringFormat.init(inst, def);
		  ZodStringFormat.init(inst, def);
		});
		function stringFormat(format, fnOrRegex, _params = {}) {
		  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
		}
		function hostname2(_params) {
		  return _stringFormat(ZodCustomStringFormat, "hostname", regexes_exports.hostname, _params);
		}
		function hex2(_params) {
		  return _stringFormat(ZodCustomStringFormat, "hex", regexes_exports.hex, _params);
		}
		function hash(alg, params) {
		  const enc = params?.enc ?? "hex";
		  const format = `${alg}_${enc}`;
		  const regex = regexes_exports[format];
		  if (!regex)
		    throw new Error(`Unrecognized hash format: ${format}`);
		  return _stringFormat(ZodCustomStringFormat, format, regex, params);
		}
		var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
		  $ZodNumber.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => numberProcessor(inst, ctx, json2, params);
		  _installLazyMethods(inst, "ZodNumber", {
		    gt(value, params) {
		      return this.check(_gt(value, params));
		    },
		    gte(value, params) {
		      return this.check(_gte(value, params));
		    },
		    min(value, params) {
		      return this.check(_gte(value, params));
		    },
		    lt(value, params) {
		      return this.check(_lt(value, params));
		    },
		    lte(value, params) {
		      return this.check(_lte(value, params));
		    },
		    max(value, params) {
		      return this.check(_lte(value, params));
		    },
		    int(params) {
		      return this.check(int(params));
		    },
		    safe(params) {
		      return this.check(int(params));
		    },
		    positive(params) {
		      return this.check(_gt(0, params));
		    },
		    nonnegative(params) {
		      return this.check(_gte(0, params));
		    },
		    negative(params) {
		      return this.check(_lt(0, params));
		    },
		    nonpositive(params) {
		      return this.check(_lte(0, params));
		    },
		    multipleOf(value, params) {
		      return this.check(_multipleOf(value, params));
		    },
		    step(value, params) {
		      return this.check(_multipleOf(value, params));
		    },
		    finite() {
		      return this;
		    }
		  });
		  const bag = inst._zod.bag;
		  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
		  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
		  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
		  inst.isFinite = true;
		  inst.format = bag.format ?? null;
		});
		function number2(params) {
		  return _number(ZodNumber, params);
		}
		var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
		  $ZodNumberFormat.init(inst, def);
		  ZodNumber.init(inst, def);
		});
		function int(params) {
		  return _int(ZodNumberFormat, params);
		}
		function float32(params) {
		  return _float32(ZodNumberFormat, params);
		}
		function float64(params) {
		  return _float64(ZodNumberFormat, params);
		}
		function int32(params) {
		  return _int32(ZodNumberFormat, params);
		}
		function uint32(params) {
		  return _uint32(ZodNumberFormat, params);
		}
		var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
		  $ZodBoolean.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => booleanProcessor(inst, ctx, json2, params);
		});
		function boolean2(params) {
		  return _boolean(ZodBoolean, params);
		}
		var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
		  $ZodBigInt.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => bigintProcessor(inst, ctx, json2, params);
		  inst.gte = (value, params) => inst.check(_gte(value, params));
		  inst.min = (value, params) => inst.check(_gte(value, params));
		  inst.gt = (value, params) => inst.check(_gt(value, params));
		  inst.gte = (value, params) => inst.check(_gte(value, params));
		  inst.min = (value, params) => inst.check(_gte(value, params));
		  inst.lt = (value, params) => inst.check(_lt(value, params));
		  inst.lte = (value, params) => inst.check(_lte(value, params));
		  inst.max = (value, params) => inst.check(_lte(value, params));
		  inst.positive = (params) => inst.check(_gt(BigInt(0), params));
		  inst.negative = (params) => inst.check(_lt(BigInt(0), params));
		  inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
		  inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
		  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
		  const bag = inst._zod.bag;
		  inst.minValue = bag.minimum ?? null;
		  inst.maxValue = bag.maximum ?? null;
		  inst.format = bag.format ?? null;
		});
		function bigint2(params) {
		  return _bigint(ZodBigInt, params);
		}
		var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
		  $ZodBigIntFormat.init(inst, def);
		  ZodBigInt.init(inst, def);
		});
		function int64(params) {
		  return _int64(ZodBigIntFormat, params);
		}
		function uint64(params) {
		  return _uint64(ZodBigIntFormat, params);
		}
		var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
		  $ZodSymbol.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => symbolProcessor(inst, ctx, json2, params);
		});
		function symbol(params) {
		  return _symbol(ZodSymbol, params);
		}
		var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
		  $ZodUndefined.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => undefinedProcessor(inst, ctx, json2, params);
		});
		function _undefined3(params) {
		  return _undefined2(ZodUndefined, params);
		}
		var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
		  $ZodNull.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => nullProcessor(inst, ctx, json2, params);
		});
		function _null3(params) {
		  return _null2(ZodNull, params);
		}
		var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
		  $ZodAny.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => anyProcessor(inst, ctx, json2, params);
		});
		function any() {
		  return _any(ZodAny);
		}
		var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
		  $ZodUnknown.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => unknownProcessor(inst, ctx, json2, params);
		});
		function unknown() {
		  return _unknown(ZodUnknown);
		}
		var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
		  $ZodNever.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => neverProcessor(inst, ctx, json2, params);
		});
		function never(params) {
		  return _never(ZodNever, params);
		}
		var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
		  $ZodVoid.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => voidProcessor(inst, ctx, json2, params);
		});
		function _void2(params) {
		  return _void(ZodVoid, params);
		}
		var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
		  $ZodDate.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => dateProcessor(inst, ctx, json2, params);
		  inst.min = (value, params) => inst.check(_gte(value, params));
		  inst.max = (value, params) => inst.check(_lte(value, params));
		  const c = inst._zod.bag;
		  inst.minDate = c.minimum ? new Date(c.minimum) : null;
		  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
		});
		function date3(params) {
		  return _date(ZodDate, params);
		}
		var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
		  $ZodArray.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => arrayProcessor(inst, ctx, json2, params);
		  inst.element = def.element;
		  _installLazyMethods(inst, "ZodArray", {
		    min(n, params) {
		      return this.check(_minLength(n, params));
		    },
		    nonempty(params) {
		      return this.check(_minLength(1, params));
		    },
		    max(n, params) {
		      return this.check(_maxLength(n, params));
		    },
		    length(n, params) {
		      return this.check(_length(n, params));
		    },
		    unwrap() {
		      return this.element;
		    }
		  });
		});
		function array(element, params) {
		  return _array(ZodArray, element, params);
		}
		function keyof(schema) {
		  const shape = schema._zod.def.shape;
		  return _enum2(Object.keys(shape));
		}
		var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
		  $ZodObjectJIT.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => objectProcessor(inst, ctx, json2, params);
		  util_exports.defineLazy(inst, "shape", () => {
		    return def.shape;
		  });
		  _installLazyMethods(inst, "ZodObject", {
		    keyof() {
		      return _enum2(Object.keys(this._zod.def.shape));
		    },
		    catchall(catchall) {
		      return this.clone({ ...this._zod.def, catchall });
		    },
		    passthrough() {
		      return this.clone({ ...this._zod.def, catchall: unknown() });
		    },
		    loose() {
		      return this.clone({ ...this._zod.def, catchall: unknown() });
		    },
		    strict() {
		      return this.clone({ ...this._zod.def, catchall: never() });
		    },
		    strip() {
		      return this.clone({ ...this._zod.def, catchall: void 0 });
		    },
		    extend(incoming) {
		      return util_exports.extend(this, incoming);
		    },
		    safeExtend(incoming) {
		      return util_exports.safeExtend(this, incoming);
		    },
		    merge(other) {
		      return util_exports.merge(this, other);
		    },
		    pick(mask) {
		      return util_exports.pick(this, mask);
		    },
		    omit(mask) {
		      return util_exports.omit(this, mask);
		    },
		    partial(...args) {
		      return util_exports.partial(ZodOptional, this, args[0]);
		    },
		    required(...args) {
		      return util_exports.required(ZodNonOptional, this, args[0]);
		    }
		  });
		});
		function object(shape, params) {
		  const def = {
		    type: "object",
		    shape: shape ?? {},
		    ...util_exports.normalizeParams(params)
		  };
		  return new ZodObject(def);
		}
		function strictObject(shape, params) {
		  return new ZodObject({
		    type: "object",
		    shape,
		    catchall: never(),
		    ...util_exports.normalizeParams(params)
		  });
		}
		function looseObject(shape, params) {
		  return new ZodObject({
		    type: "object",
		    shape,
		    catchall: unknown(),
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
		  $ZodUnion.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
		  inst.options = def.options;
		});
		function union(options, params) {
		  return new ZodUnion({
		    type: "union",
		    options,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
		  ZodUnion.init(inst, def);
		  $ZodXor.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
		  inst.options = def.options;
		});
		function xor(options, params) {
		  return new ZodXor({
		    type: "union",
		    options,
		    inclusive: false,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
		  ZodUnion.init(inst, def);
		  $ZodDiscriminatedUnion.init(inst, def);
		});
		function discriminatedUnion(discriminator, options, params) {
		  return new ZodDiscriminatedUnion({
		    type: "union",
		    options,
		    discriminator,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
		  $ZodIntersection.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => intersectionProcessor(inst, ctx, json2, params);
		});
		function intersection(left, right) {
		  return new ZodIntersection({
		    type: "intersection",
		    left,
		    right
		  });
		}
		var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
		  $ZodTuple.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => tupleProcessor(inst, ctx, json2, params);
		  inst.rest = (rest) => inst.clone({
		    ...inst._zod.def,
		    rest
		  });
		});
		function tuple(items, _paramsOrRest, _params) {
		  const hasRest = _paramsOrRest instanceof $ZodType;
		  const params = hasRest ? _params : _paramsOrRest;
		  const rest = hasRest ? _paramsOrRest : null;
		  return new ZodTuple({
		    type: "tuple",
		    items,
		    rest,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
		  $ZodRecord.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => recordProcessor(inst, ctx, json2, params);
		  inst.keyType = def.keyType;
		  inst.valueType = def.valueType;
		});
		function record(keyType, valueType, params) {
		  if (!valueType || !valueType._zod) {
		    return new ZodRecord({
		      type: "record",
		      keyType: string2(),
		      valueType: keyType,
		      ...util_exports.normalizeParams(valueType)
		    });
		  }
		  return new ZodRecord({
		    type: "record",
		    keyType,
		    valueType,
		    ...util_exports.normalizeParams(params)
		  });
		}
		function partialRecord(keyType, valueType, params) {
		  const k = clone(keyType);
		  k._zod.values = void 0;
		  return new ZodRecord({
		    type: "record",
		    keyType: k,
		    valueType,
		    ...util_exports.normalizeParams(params)
		  });
		}
		function looseRecord(keyType, valueType, params) {
		  return new ZodRecord({
		    type: "record",
		    keyType,
		    valueType,
		    mode: "loose",
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
		  $ZodMap.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => mapProcessor(inst, ctx, json2, params);
		  inst.keyType = def.keyType;
		  inst.valueType = def.valueType;
		  inst.min = (...args) => inst.check(_minSize(...args));
		  inst.nonempty = (params) => inst.check(_minSize(1, params));
		  inst.max = (...args) => inst.check(_maxSize(...args));
		  inst.size = (...args) => inst.check(_size(...args));
		});
		function map(keyType, valueType, params) {
		  return new ZodMap({
		    type: "map",
		    keyType,
		    valueType,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
		  $ZodSet.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => setProcessor(inst, ctx, json2, params);
		  inst.min = (...args) => inst.check(_minSize(...args));
		  inst.nonempty = (params) => inst.check(_minSize(1, params));
		  inst.max = (...args) => inst.check(_maxSize(...args));
		  inst.size = (...args) => inst.check(_size(...args));
		});
		function set(valueType, params) {
		  return new ZodSet({
		    type: "set",
		    valueType,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
		  $ZodEnum.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => enumProcessor(inst, ctx, json2, params);
		  inst.enum = def.entries;
		  inst.options = Object.values(def.entries);
		  const keys = new Set(Object.keys(def.entries));
		  inst.extract = (values, params) => {
		    const newEntries = {};
		    for (const value of values) {
		      if (keys.has(value)) {
		        newEntries[value] = def.entries[value];
		      } else
		        throw new Error(`Key ${value} not found in enum`);
		    }
		    return new ZodEnum({
		      ...def,
		      checks: [],
		      ...util_exports.normalizeParams(params),
		      entries: newEntries
		    });
		  };
		  inst.exclude = (values, params) => {
		    const newEntries = { ...def.entries };
		    for (const value of values) {
		      if (keys.has(value)) {
		        delete newEntries[value];
		      } else
		        throw new Error(`Key ${value} not found in enum`);
		    }
		    return new ZodEnum({
		      ...def,
		      checks: [],
		      ...util_exports.normalizeParams(params),
		      entries: newEntries
		    });
		  };
		});
		function _enum2(values, params) {
		  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
		  return new ZodEnum({
		    type: "enum",
		    entries,
		    ...util_exports.normalizeParams(params)
		  });
		}
		function nativeEnum(entries, params) {
		  return new ZodEnum({
		    type: "enum",
		    entries,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
		  $ZodLiteral.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => literalProcessor(inst, ctx, json2, params);
		  inst.values = new Set(def.values);
		  Object.defineProperty(inst, "value", {
		    get() {
		      if (def.values.length > 1) {
		        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		      }
		      return def.values[0];
		    }
		  });
		});
		function literal(value, params) {
		  return new ZodLiteral({
		    type: "literal",
		    values: Array.isArray(value) ? value : [value],
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
		  $ZodFile.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => fileProcessor(inst, ctx, json2, params);
		  inst.min = (size, params) => inst.check(_minSize(size, params));
		  inst.max = (size, params) => inst.check(_maxSize(size, params));
		  inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
		});
		function file(params) {
		  return _file(ZodFile, params);
		}
		var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
		  $ZodTransform.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => transformProcessor(inst, ctx, json2, params);
		  inst._zod.parse = (payload, _ctx) => {
		    if (_ctx.direction === "backward") {
		      throw new $ZodEncodeError(inst.constructor.name);
		    }
		    payload.addIssue = (issue2) => {
		      if (typeof issue2 === "string") {
		        payload.issues.push(util_exports.issue(issue2, payload.value, def));
		      } else {
		        const _issue = issue2;
		        if (_issue.fatal)
		          _issue.continue = false;
		        _issue.code ?? (_issue.code = "custom");
		        _issue.input ?? (_issue.input = payload.value);
		        _issue.inst ?? (_issue.inst = inst);
		        payload.issues.push(util_exports.issue(_issue));
		      }
		    };
		    const output = def.transform(payload.value, payload);
		    if (output instanceof Promise) {
		      return output.then((output2) => {
		        payload.value = output2;
		        payload.fallback = true;
		        return payload;
		      });
		    }
		    payload.value = output;
		    payload.fallback = true;
		    return payload;
		  };
		});
		function transform(fn) {
		  return new ZodTransform({
		    type: "transform",
		    transform: fn
		  });
		}
		var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
		  $ZodOptional.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
		  return new ZodOptional({
		    type: "optional",
		    innerType
		  });
		}
		var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
		  $ZodExactOptional.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		});
		function exactOptional(innerType) {
		  return new ZodExactOptional({
		    type: "optional",
		    innerType
		  });
		}
		var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
		  $ZodNullable.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => nullableProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
		  return new ZodNullable({
		    type: "nullable",
		    innerType
		  });
		}
		function nullish2(innerType) {
		  return optional(nullable(innerType));
		}
		var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
		  $ZodDefault.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => defaultProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		  inst.removeDefault = inst.unwrap;
		});
		function _default2(innerType, defaultValue) {
		  return new ZodDefault({
		    type: "default",
		    innerType,
		    get defaultValue() {
		      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
		    }
		  });
		}
		var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
		  $ZodPrefault.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => prefaultProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
		  return new ZodPrefault({
		    type: "prefault",
		    innerType,
		    get defaultValue() {
		      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
		    }
		  });
		}
		var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
		  $ZodNonOptional.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => nonoptionalProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
		  return new ZodNonOptional({
		    type: "nonoptional",
		    innerType,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
		  $ZodSuccess.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => successProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		});
		function success(innerType) {
		  return new ZodSuccess({
		    type: "success",
		    innerType
		  });
		}
		var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
		  $ZodCatch.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => catchProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		  inst.removeCatch = inst.unwrap;
		});
		function _catch2(innerType, catchValue) {
		  return new ZodCatch({
		    type: "catch",
		    innerType,
		    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
		  });
		}
		var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
		  $ZodNaN.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => nanProcessor(inst, ctx, json2, params);
		});
		function nan(params) {
		  return _nan(ZodNaN, params);
		}
		var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
		  $ZodPipe.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => pipeProcessor(inst, ctx, json2, params);
		  inst.in = def.in;
		  inst.out = def.out;
		});
		function pipe(in_, out) {
		  return new ZodPipe({
		    type: "pipe",
		    in: in_,
		    out
		    // ...util.normalizeParams(params),
		  });
		}
		var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
		  ZodPipe.init(inst, def);
		  $ZodCodec.init(inst, def);
		});
		function codec(in_, out, params) {
		  return new ZodCodec({
		    type: "pipe",
		    in: in_,
		    out,
		    transform: params.decode,
		    reverseTransform: params.encode
		  });
		}
		function invertCodec(codec2) {
		  const def = codec2._zod.def;
		  return new ZodCodec({
		    type: "pipe",
		    in: def.out,
		    out: def.in,
		    transform: def.reverseTransform,
		    reverseTransform: def.transform
		  });
		}
		var ZodPreprocess = /* @__PURE__ */ $constructor("ZodPreprocess", (inst, def) => {
		  ZodPipe.init(inst, def);
		  $ZodPreprocess.init(inst, def);
		});
		var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
		  $ZodReadonly.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => readonlyProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
		  return new ZodReadonly({
		    type: "readonly",
		    innerType
		  });
		}
		var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
		  $ZodTemplateLiteral.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => templateLiteralProcessor(inst, ctx, json2, params);
		});
		function templateLiteral(parts, params) {
		  return new ZodTemplateLiteral({
		    type: "template_literal",
		    parts,
		    ...util_exports.normalizeParams(params)
		  });
		}
		var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
		  $ZodLazy.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => lazyProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.getter();
		});
		function lazy(getter) {
		  return new ZodLazy({
		    type: "lazy",
		    getter
		  });
		}
		var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
		  $ZodPromise.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => promiseProcessor(inst, ctx, json2, params);
		  inst.unwrap = () => inst._zod.def.innerType;
		});
		function promise(innerType) {
		  return new ZodPromise({
		    type: "promise",
		    innerType
		  });
		}
		var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
		  $ZodFunction.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => functionProcessor(inst, ctx, json2, params);
		});
		function _function(params) {
		  return new ZodFunction({
		    type: "function",
		    input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
		    output: params?.output ?? unknown()
		  });
		}
		var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
		  $ZodCustom.init(inst, def);
		  ZodType.init(inst, def);
		  inst._zod.processJSONSchema = (ctx, json2, params) => customProcessor(inst, ctx, json2, params);
		});
		function check(fn) {
		  const ch = new $ZodCheck({
		    check: "custom"
		    // ...util.normalizeParams(params),
		  });
		  ch._zod.check = fn;
		  return ch;
		}
		function custom(fn, _params) {
		  return _custom(ZodCustom, fn ?? (() => true), _params);
		}
		function refine(fn, _params = {}) {
		  return _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
		  return _superRefine(fn, params);
		}
		var describe2 = describe;
		var meta2 = meta;
		function _instanceof(cls, params = {}) {
		  const inst = new ZodCustom({
		    type: "custom",
		    check: "custom",
		    fn: (data) => data instanceof cls,
		    abort: true,
		    ...util_exports.normalizeParams(params)
		  });
		  inst._zod.bag.Class = cls;
		  inst._zod.check = (payload) => {
		    if (!(payload.value instanceof cls)) {
		      payload.issues.push({
		        code: "invalid_type",
		        expected: cls.name,
		        input: payload.value,
		        inst,
		        path: [...inst._zod.def.path ?? []]
		      });
		    }
		  };
		  return inst;
		}
		var stringbool = (...args) => _stringbool({
		  Codec: ZodCodec,
		  Boolean: ZodBoolean,
		  String: ZodString
		}, ...args);
		function json(params) {
		  const jsonSchema = lazy(() => {
		    return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
		  });
		  return jsonSchema;
		}
		function preprocess(fn, schema) {
		  return new ZodPreprocess({
		    type: "pipe",
		    in: transform(fn),
		    out: schema
		  });
		}

		// node_modules/zod/v4/classic/compat.js
		var ZodIssueCode = {
		  invalid_type: "invalid_type",
		  too_big: "too_big",
		  too_small: "too_small",
		  invalid_format: "invalid_format",
		  not_multiple_of: "not_multiple_of",
		  unrecognized_keys: "unrecognized_keys",
		  invalid_union: "invalid_union",
		  invalid_key: "invalid_key",
		  invalid_element: "invalid_element",
		  invalid_value: "invalid_value",
		  custom: "custom"
		};
		function setErrorMap(map2) {
		  config({
		    customError: map2
		  });
		}
		function getErrorMap() {
		  return config().customError;
		}
		var ZodFirstPartyTypeKind;
		/* @__PURE__ */ (function(ZodFirstPartyTypeKind2) {
		})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));

		// node_modules/zod/v4/classic/from-json-schema.js
		var z = {
		  ...schemas_exports2,
		  ...checks_exports2,
		  iso: iso_exports
		};
		var RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
		  // Schema identification
		  "$schema",
		  "$ref",
		  "$defs",
		  "definitions",
		  // Core schema keywords
		  "$id",
		  "id",
		  "$comment",
		  "$anchor",
		  "$vocabulary",
		  "$dynamicRef",
		  "$dynamicAnchor",
		  // Type
		  "type",
		  "enum",
		  "const",
		  // Composition
		  "anyOf",
		  "oneOf",
		  "allOf",
		  "not",
		  // Object
		  "properties",
		  "required",
		  "additionalProperties",
		  "patternProperties",
		  "propertyNames",
		  "minProperties",
		  "maxProperties",
		  // Array
		  "items",
		  "prefixItems",
		  "additionalItems",
		  "minItems",
		  "maxItems",
		  "uniqueItems",
		  "contains",
		  "minContains",
		  "maxContains",
		  // String
		  "minLength",
		  "maxLength",
		  "pattern",
		  "format",
		  // Number
		  "minimum",
		  "maximum",
		  "exclusiveMinimum",
		  "exclusiveMaximum",
		  "multipleOf",
		  // Already handled metadata
		  "description",
		  "default",
		  // Content
		  "contentEncoding",
		  "contentMediaType",
		  "contentSchema",
		  // Unsupported (error-throwing)
		  "unevaluatedItems",
		  "unevaluatedProperties",
		  "if",
		  "then",
		  "else",
		  "dependentSchemas",
		  "dependentRequired",
		  // OpenAPI
		  "nullable",
		  "readOnly"
		]);
		function detectVersion(schema, defaultTarget) {
		  const $schema = schema.$schema;
		  if ($schema === "https://json-schema.org/draft/2020-12/schema") {
		    return "draft-2020-12";
		  }
		  if ($schema === "http://json-schema.org/draft-07/schema#") {
		    return "draft-7";
		  }
		  if ($schema === "http://json-schema.org/draft-04/schema#") {
		    return "draft-4";
		  }
		  return defaultTarget ?? "draft-2020-12";
		}
		function resolveRef(ref, ctx) {
		  if (!ref.startsWith("#")) {
		    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
		  }
		  const path = ref.slice(1).split("/").filter(Boolean);
		  if (path.length === 0) {
		    return ctx.rootSchema;
		  }
		  const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
		  if (path[0] === defsKey) {
		    const key = path[1];
		    if (!key || !ctx.defs[key]) {
		      throw new Error(`Reference not found: ${ref}`);
		    }
		    return ctx.defs[key];
		  }
		  throw new Error(`Reference not found: ${ref}`);
		}
		function convertBaseSchema(schema, ctx) {
		  if (schema.not !== void 0) {
		    if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
		      return z.never();
		    }
		    throw new Error("not is not supported in Zod (except { not: {} } for never)");
		  }
		  if (schema.unevaluatedItems !== void 0) {
		    throw new Error("unevaluatedItems is not supported");
		  }
		  if (schema.unevaluatedProperties !== void 0) {
		    throw new Error("unevaluatedProperties is not supported");
		  }
		  if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) {
		    throw new Error("Conditional schemas (if/then/else) are not supported");
		  }
		  if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) {
		    throw new Error("dependentSchemas and dependentRequired are not supported");
		  }
		  if (schema.$ref) {
		    const refPath = schema.$ref;
		    if (ctx.refs.has(refPath)) {
		      return ctx.refs.get(refPath);
		    }
		    if (ctx.processing.has(refPath)) {
		      return z.lazy(() => {
		        if (!ctx.refs.has(refPath)) {
		          throw new Error(`Circular reference not resolved: ${refPath}`);
		        }
		        return ctx.refs.get(refPath);
		      });
		    }
		    ctx.processing.add(refPath);
		    const resolved = resolveRef(refPath, ctx);
		    const zodSchema2 = convertSchema(resolved, ctx);
		    ctx.refs.set(refPath, zodSchema2);
		    ctx.processing.delete(refPath);
		    return zodSchema2;
		  }
		  if (schema.enum !== void 0) {
		    const enumValues = schema.enum;
		    if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
		      return z.null();
		    }
		    if (enumValues.length === 0) {
		      return z.never();
		    }
		    if (enumValues.length === 1) {
		      return z.literal(enumValues[0]);
		    }
		    if (enumValues.every((v) => typeof v === "string")) {
		      return z.enum(enumValues);
		    }
		    const literalSchemas = enumValues.map((v) => z.literal(v));
		    if (literalSchemas.length < 2) {
		      return literalSchemas[0];
		    }
		    return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
		  }
		  if (schema.const !== void 0) {
		    return z.literal(schema.const);
		  }
		  const type = schema.type;
		  if (Array.isArray(type)) {
		    const typeSchemas = type.map((t) => {
		      const typeSchema = { ...schema, type: t };
		      return convertBaseSchema(typeSchema, ctx);
		    });
		    if (typeSchemas.length === 0) {
		      return z.never();
		    }
		    if (typeSchemas.length === 1) {
		      return typeSchemas[0];
		    }
		    return z.union(typeSchemas);
		  }
		  if (!type) {
		    return z.any();
		  }
		  let zodSchema;
		  switch (type) {
		    case "string": {
		      let stringSchema = z.string();
		      if (schema.format) {
		        const format = schema.format;
		        if (format === "email") {
		          stringSchema = stringSchema.check(z.email());
		        } else if (format === "uri" || format === "uri-reference") {
		          stringSchema = stringSchema.check(z.url());
		        } else if (format === "uuid" || format === "guid") {
		          stringSchema = stringSchema.check(z.uuid());
		        } else if (format === "date-time") {
		          stringSchema = stringSchema.check(z.iso.datetime());
		        } else if (format === "date") {
		          stringSchema = stringSchema.check(z.iso.date());
		        } else if (format === "time") {
		          stringSchema = stringSchema.check(z.iso.time());
		        } else if (format === "duration") {
		          stringSchema = stringSchema.check(z.iso.duration());
		        } else if (format === "ipv4") {
		          stringSchema = stringSchema.check(z.ipv4());
		        } else if (format === "ipv6") {
		          stringSchema = stringSchema.check(z.ipv6());
		        } else if (format === "mac") {
		          stringSchema = stringSchema.check(z.mac());
		        } else if (format === "cidr") {
		          stringSchema = stringSchema.check(z.cidrv4());
		        } else if (format === "cidr-v6") {
		          stringSchema = stringSchema.check(z.cidrv6());
		        } else if (format === "base64") {
		          stringSchema = stringSchema.check(z.base64());
		        } else if (format === "base64url") {
		          stringSchema = stringSchema.check(z.base64url());
		        } else if (format === "e164") {
		          stringSchema = stringSchema.check(z.e164());
		        } else if (format === "jwt") {
		          stringSchema = stringSchema.check(z.jwt());
		        } else if (format === "emoji") {
		          stringSchema = stringSchema.check(z.emoji());
		        } else if (format === "nanoid") {
		          stringSchema = stringSchema.check(z.nanoid());
		        } else if (format === "cuid") {
		          stringSchema = stringSchema.check(z.cuid());
		        } else if (format === "cuid2") {
		          stringSchema = stringSchema.check(z.cuid2());
		        } else if (format === "ulid") {
		          stringSchema = stringSchema.check(z.ulid());
		        } else if (format === "xid") {
		          stringSchema = stringSchema.check(z.xid());
		        } else if (format === "ksuid") {
		          stringSchema = stringSchema.check(z.ksuid());
		        }
		      }
		      if (typeof schema.minLength === "number") {
		        stringSchema = stringSchema.min(schema.minLength);
		      }
		      if (typeof schema.maxLength === "number") {
		        stringSchema = stringSchema.max(schema.maxLength);
		      }
		      if (schema.pattern) {
		        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
		      }
		      zodSchema = stringSchema;
		      break;
		    }
		    case "number":
		    case "integer": {
		      let numberSchema = type === "integer" ? z.number().int() : z.number();
		      if (typeof schema.minimum === "number") {
		        numberSchema = numberSchema.min(schema.minimum);
		      }
		      if (typeof schema.maximum === "number") {
		        numberSchema = numberSchema.max(schema.maximum);
		      }
		      if (typeof schema.exclusiveMinimum === "number") {
		        numberSchema = numberSchema.gt(schema.exclusiveMinimum);
		      } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
		        numberSchema = numberSchema.gt(schema.minimum);
		      }
		      if (typeof schema.exclusiveMaximum === "number") {
		        numberSchema = numberSchema.lt(schema.exclusiveMaximum);
		      } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
		        numberSchema = numberSchema.lt(schema.maximum);
		      }
		      if (typeof schema.multipleOf === "number") {
		        numberSchema = numberSchema.multipleOf(schema.multipleOf);
		      }
		      zodSchema = numberSchema;
		      break;
		    }
		    case "boolean": {
		      zodSchema = z.boolean();
		      break;
		    }
		    case "null": {
		      zodSchema = z.null();
		      break;
		    }
		    case "object": {
		      const shape = {};
		      const properties = schema.properties || {};
		      const requiredSet = new Set(schema.required || []);
		      for (const [key, propSchema] of Object.entries(properties)) {
		        const propZodSchema = convertSchema(propSchema, ctx);
		        shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
		      }
		      if (schema.propertyNames) {
		        const keySchema = convertSchema(schema.propertyNames, ctx);
		        const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
		        if (Object.keys(shape).length === 0) {
		          zodSchema = z.record(keySchema, valueSchema);
		          break;
		        }
		        const objectSchema2 = z.object(shape).passthrough();
		        const recordSchema = z.looseRecord(keySchema, valueSchema);
		        zodSchema = z.intersection(objectSchema2, recordSchema);
		        break;
		      }
		      if (schema.patternProperties) {
		        const patternProps = schema.patternProperties;
		        const patternKeys = Object.keys(patternProps);
		        const looseRecords = [];
		        for (const pattern of patternKeys) {
		          const patternValue = convertSchema(patternProps[pattern], ctx);
		          const keySchema = z.string().regex(new RegExp(pattern));
		          looseRecords.push(z.looseRecord(keySchema, patternValue));
		        }
		        const schemasToIntersect = [];
		        if (Object.keys(shape).length > 0) {
		          schemasToIntersect.push(z.object(shape).passthrough());
		        }
		        schemasToIntersect.push(...looseRecords);
		        if (schemasToIntersect.length === 0) {
		          zodSchema = z.object({}).passthrough();
		        } else if (schemasToIntersect.length === 1) {
		          zodSchema = schemasToIntersect[0];
		        } else {
		          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
		          for (let i = 2; i < schemasToIntersect.length; i++) {
		            result = z.intersection(result, schemasToIntersect[i]);
		          }
		          zodSchema = result;
		        }
		        break;
		      }
		      const objectSchema = z.object(shape);
		      if (schema.additionalProperties === false) {
		        zodSchema = objectSchema.strict();
		      } else if (typeof schema.additionalProperties === "object") {
		        zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
		      } else {
		        zodSchema = objectSchema.passthrough();
		      }
		      break;
		    }
		    case "array": {
		      const prefixItems = schema.prefixItems;
		      const items = schema.items;
		      if (prefixItems && Array.isArray(prefixItems)) {
		        const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
		        const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
		        if (rest) {
		          zodSchema = z.tuple(tupleItems).rest(rest);
		        } else {
		          zodSchema = z.tuple(tupleItems);
		        }
		        if (typeof schema.minItems === "number") {
		          zodSchema = zodSchema.check(z.minLength(schema.minItems));
		        }
		        if (typeof schema.maxItems === "number") {
		          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
		        }
		      } else if (Array.isArray(items)) {
		        const tupleItems = items.map((item) => convertSchema(item, ctx));
		        const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
		        if (rest) {
		          zodSchema = z.tuple(tupleItems).rest(rest);
		        } else {
		          zodSchema = z.tuple(tupleItems);
		        }
		        if (typeof schema.minItems === "number") {
		          zodSchema = zodSchema.check(z.minLength(schema.minItems));
		        }
		        if (typeof schema.maxItems === "number") {
		          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
		        }
		      } else if (items !== void 0) {
		        const element = convertSchema(items, ctx);
		        let arraySchema = z.array(element);
		        if (typeof schema.minItems === "number") {
		          arraySchema = arraySchema.min(schema.minItems);
		        }
		        if (typeof schema.maxItems === "number") {
		          arraySchema = arraySchema.max(schema.maxItems);
		        }
		        zodSchema = arraySchema;
		      } else {
		        zodSchema = z.array(z.any());
		      }
		      break;
		    }
		    default:
		      throw new Error(`Unsupported type: ${type}`);
		  }
		  return zodSchema;
		}
		function convertSchema(schema, ctx) {
		  if (typeof schema === "boolean") {
		    return schema ? z.any() : z.never();
		  }
		  let baseSchema = convertBaseSchema(schema, ctx);
		  const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
		  if (schema.anyOf && Array.isArray(schema.anyOf)) {
		    const options = schema.anyOf.map((s) => convertSchema(s, ctx));
		    const anyOfUnion = z.union(options);
		    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
		  }
		  if (schema.oneOf && Array.isArray(schema.oneOf)) {
		    const options = schema.oneOf.map((s) => convertSchema(s, ctx));
		    const oneOfUnion = z.xor(options);
		    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
		  }
		  if (schema.allOf && Array.isArray(schema.allOf)) {
		    if (schema.allOf.length === 0) {
		      baseSchema = hasExplicitType ? baseSchema : z.any();
		    } else {
		      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
		      const startIdx = hasExplicitType ? 0 : 1;
		      for (let i = startIdx; i < schema.allOf.length; i++) {
		        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
		      }
		      baseSchema = result;
		    }
		  }
		  if (schema.nullable === true && ctx.version === "openapi-3.0") {
		    baseSchema = z.nullable(baseSchema);
		  }
		  if (schema.readOnly === true) {
		    baseSchema = z.readonly(baseSchema);
		  }
		  if (schema.default !== void 0) {
		    baseSchema = baseSchema.default(schema.default);
		  }
		  const extraMeta = {};
		  const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
		  for (const key of coreMetadataKeys) {
		    if (key in schema) {
		      extraMeta[key] = schema[key];
		    }
		  }
		  const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
		  for (const key of contentMetadataKeys) {
		    if (key in schema) {
		      extraMeta[key] = schema[key];
		    }
		  }
		  for (const key of Object.keys(schema)) {
		    if (!RECOGNIZED_KEYS.has(key)) {
		      extraMeta[key] = schema[key];
		    }
		  }
		  if (Object.keys(extraMeta).length > 0) {
		    ctx.registry.add(baseSchema, extraMeta);
		  }
		  if (schema.description) {
		    baseSchema = baseSchema.describe(schema.description);
		  }
		  return baseSchema;
		}
		function fromJSONSchema(schema, params) {
		  if (typeof schema === "boolean") {
		    return schema ? z.any() : z.never();
		  }
		  let normalized;
		  try {
		    normalized = JSON.parse(JSON.stringify(schema));
		  } catch {
		    throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
		  }
		  const version2 = detectVersion(normalized, params?.defaultTarget);
		  const defs = normalized.$defs || normalized.definitions || {};
		  const ctx = {
		    version: version2,
		    defs,
		    refs: /* @__PURE__ */ new Map(),
		    processing: /* @__PURE__ */ new Set(),
		    rootSchema: normalized,
		    registry: params?.registry ?? globalRegistry
		  };
		  return convertSchema(normalized, ctx);
		}

		// node_modules/zod/v4/classic/coerce.js
		var coerce_exports = {};
		__export(coerce_exports, {
		  bigint: () => bigint3,
		  boolean: () => boolean3,
		  date: () => date4,
		  number: () => number3,
		  string: () => string3
		});
		function string3(params) {
		  return _coercedString(ZodString, params);
		}
		function number3(params) {
		  return _coercedNumber(ZodNumber, params);
		}
		function boolean3(params) {
		  return _coercedBoolean(ZodBoolean, params);
		}
		function bigint3(params) {
		  return _coercedBigint(ZodBigInt, params);
		}
		function date4(params) {
		  return _coercedDate(ZodDate, params);
		}

		// node_modules/zod/v4/classic/external.js
		config(en_default());

		// src/contracts/remote.ts
		var category = external_exports.enum(["tool", "agent", "ui", "data", "vision", "docs", "memory", "usage", "notify", "dev", "chat", "hub", "hub-ext", "other"]);
		var pluginSummary = external_exports.object({
		  packageName: external_exports.string(),
		  repoFullName: external_exports.string(),
		  name: external_exports.string(),
		  shortDescription: external_exports.string(),
		  developer: external_exports.string(),
		  iconUrl: external_exports.string().nullable(),
		  categories: external_exports.array(category).readonly(),
		  version: external_exports.string().nullable(),
		  stars: external_exports.number(),
		  downloads: external_exports.number(),
		  rating: external_exports.number(),
		  ratingCount: external_exports.number(),
		  installed: external_exports.boolean(),
		  enabled: external_exports.boolean().nullable(),
		  updatedAt: external_exports.string().nullable(),
		  /** Download source: 'npm' (registry, direct) or 'github' (clone, may need proxy). */
		  source: external_exports.enum(["npm", "github"]),
		  /** Whether the package is published on npm (can install via npm registry). */
		  hasNpm: external_exports.boolean(),
		  /** Whether the package has a GitHub repository (can install via git clone). */
		  hasGit: external_exports.boolean(),
		  /** Trust level from the ecosystem index (official/verified/community/unreviewed); null = unknown. */
		  trustLevel: external_exports.string().nullable().optional(),
		  /** Estimated health snapshot (0-100, no live issue fetch) — for list sorting. */
		  health: external_exports.number()
		}).readonly();
		var pluginListResult = external_exports.object({
		  total: external_exports.number(),
		  plugins: external_exports.array(pluginSummary).readonly()
		}).readonly();
		var versionRow = external_exports.object({
		  version: external_exports.string(),
		  publishedAt: external_exports.string().nullable(),
		  changelog: external_exports.string().nullable(),
		  tagName: external_exports.string().nullable()
		}).readonly();
		var depEdge = external_exports.object({
		  name: external_exports.string(),
		  version: external_exports.string().nullable(),
		  kind: external_exports.enum(["runtime", "dev", "peer"])
		}).readonly();
		var reviewRow = external_exports.object({
		  id: external_exports.number(),
		  actor: external_exports.string(),
		  score: external_exports.number(),
		  comment: external_exports.string(),
		  createdAt: external_exports.string()
		}).readonly();
		var dependentRow = external_exports.object({
		  packageName: external_exports.string(),
		  name: external_exports.string(),
		  version: external_exports.string().nullable(),
		  rating: external_exports.number(),
		  installed: external_exports.boolean()
		}).readonly();
		var pluginDetail = external_exports.object({
		  packageName: external_exports.string(),
		  repoFullName: external_exports.string(),
		  name: external_exports.string(),
		  shortDescription: external_exports.string(),
		  fullDescription: external_exports.string(),
		  usage: external_exports.string(),
		  developer: external_exports.string(),
		  iconUrl: external_exports.string().nullable(),
		  categories: external_exports.array(category).readonly(),
		  version: external_exports.string().nullable(),
		  stars: external_exports.number(),
		  downloads: external_exports.number(),
		  rating: external_exports.number(),
		  ratingCount: external_exports.number(),
		  installed: external_exports.boolean(),
		  enabled: external_exports.boolean().nullable(),
		  topics: external_exports.array(external_exports.string()).readonly(),
		  license: external_exports.string().nullable(),
		  homepage: external_exports.string().nullable(),
		  repoUrl: external_exports.string(),
		  defaultBranch: external_exports.string(),
		  screenshots: external_exports.array(external_exports.string()).readonly(),
		  versions: external_exports.array(versionRow).readonly(),
		  dependencies: external_exports.array(depEdge).readonly(),
		  dependents: external_exports.array(dependentRow).readonly(),
		  reviews: external_exports.array(reviewRow).readonly(),
		  updatedAt: external_exports.string().nullable(),
		  /** Download source: 'npm' (registry, direct) or 'github' (clone, may need proxy). */
		  source: external_exports.enum(["npm", "github"]),
		  /** Whether the package is published on npm (can install via npm registry). */
		  hasNpm: external_exports.boolean(),
		  /** Whether the package has a GitHub repository (can install via git clone). */
		  hasGit: external_exports.boolean(),
		  /** Locally installed version (null when not installed). */
		  installedVersion: external_exports.string().nullable().optional(),
		  /** True when installed and an update is available. */
		  hasUpdate: external_exports.boolean().optional(),
		  /** Trust level from the ecosystem index; null = unknown. */
		  trustLevel: external_exports.string().nullable().optional()
		}).readonly();
		var opResult = external_exports.object({
		  ok: external_exports.boolean(),
		  message: external_exports.string(),
		  detail: external_exports.string().nullable()
		}).readonly();
		var installReceipt = external_exports.object({
		  ok: external_exports.boolean(),
		  message: external_exports.string(),
		  packageName: external_exports.string(),
		  detail: external_exports.string().nullable(),
		  restartRequired: external_exports.boolean(),
		  reloadRequired: external_exports.boolean(),
		  /** Environment variables the plugin reads that the user may need to configure. */
		  requiredEnv: external_exports.array(external_exports.string()).optional()
		}).readonly();
		var categoryToggleResult = external_exports.object({
		  ok: external_exports.boolean(),
		  message: external_exports.string(),
		  detail: external_exports.string().nullable(),
		  changed: external_exports.number(),
		  skipped: external_exports.array(external_exports.object({
		    packageName: external_exports.string(),
		    message: external_exports.string()
		  }).readonly()).readonly()
		}).readonly();
		var syncStatus = external_exports.object({
		  state: external_exports.enum(["idle", "syncing", "error"]),
		  lastSyncAt: external_exports.string().nullable(),
		  lastSyncTotal: external_exports.number(),
		  lastError: external_exports.string().nullable(),
		  nextSyncAt: external_exports.string().nullable(),
		  scheduleHours: external_exports.number()
		}).readonly();
		var storeSettings = external_exports.object({
		  tokenConfigured: external_exports.boolean(),
		  tokenMasked: external_exports.string(),
		  scheduleHours: external_exports.number(),
		  profileName: external_exports.string(),
		  rateLimitRemaining: external_exports.number().nullable(),
		  dbPath: external_exports.string(),
		  pluginCount: external_exports.number()
		}).readonly();
		var auditRow = external_exports.object({
		  id: external_exports.number(),
		  actor: external_exports.string(),
		  action: external_exports.string(),
		  target: external_exports.string(),
		  result: external_exports.string(),
		  message: external_exports.string(),
		  createdAt: external_exports.string()
		}).readonly();
		var auditPage = external_exports.object({
		  total: external_exports.number(),
		  rows: external_exports.array(auditRow).readonly()
		}).readonly();
		var dependencyGraph = external_exports.object({
		  root: external_exports.string(),
		  rootName: external_exports.string(),
		  dependencies: external_exports.array(depEdge).readonly(),
		  dependents: external_exports.array(dependentRow).readonly()
		}).readonly();
		var installedPlugin = external_exports.object({
		  packageName: external_exports.string(),
		  entryId: external_exports.string(),
		  name: external_exports.string(),
		  /** 'system' (Loader infra), 'download' (registry/git installs), or 'own' (local file:/link: — user-created plugins). */
		  category: external_exports.enum(["system", "download", "own"]),
		  /** Sub-group within the parent category (core/ui/tool/... or declared group). */
		  group: external_exports.string(),
		  groupLabel: external_exports.string(),
		  enabled: external_exports.boolean(),
		  phase: external_exports.string().nullable(),
		  managed: external_exports.boolean(),
		  /** Infrastructure entries that must not be disabled from the UI. */
		  protected: external_exports.boolean(),
		  /** Alias of category for readability. */
		  type: external_exports.string(),
		  /** Local install path for 自创作插件 (file:/link: installs); null otherwise. */
		  localPath: external_exports.string().nullable(),
		  /** Whether the local plugin has been published (npm exists / repository declared). */
		  published: external_exports.boolean(),
		  /** Public repository URL for published local plugins; null otherwise. */
		  repoUrl: external_exports.string().nullable(),
		  /** Installed version read from the local package.json. */
		  version: external_exports.string().nullable().optional(),
		  /** Latest known version from the store mirror (npm / GitHub release). */
		  latestVersion: external_exports.string().nullable().optional(),
		  /** True when the installed version is older than the latest known one. */
		  hasUpdate: external_exports.boolean().optional()
		}).readonly();
		var scaffoldInfo = external_exports.object({
		  templateRepo: external_exports.string(),
		  templateUrl: external_exports.string(),
		  docsUrl: external_exports.string(),
		  guide: external_exports.string(),
		  commands: external_exports.array(external_exports.string()).readonly(),
		  categories: external_exports.array(external_exports.string()).readonly()
		}).readonly();
		var strict = (typeSymbol, schema) => ({ mode: "strict", typeSymbol, schema });
		var parameter = (name, schema) => ({ name, wire: name, source: "json", codec: strict(`dsh-plugin-hub/types#${name}`, schema) });
		var filters = external_exports.object({
		  category: category.nullish(),
		  query: external_exports.string().nullish(),
		  sort: external_exports.enum(["random", "health", "stars", "rating", "downloads", "updated", "name"]).nullish(),
		  installedOnly: external_exports.boolean().nullish(),
		  limit: external_exports.number().nullish(),
		  offset: external_exports.number().nullish()
		}).readonly();
		var auditQuery = external_exports.object({
		  action: external_exports.string().nullish(),
		  actor: external_exports.string().nullish(),
		  target: external_exports.string().nullish(),
		  limit: external_exports.number().nullish(),
		  offset: external_exports.number().nullish()
		}).readonly();
		var RESULT_SYMBOL = {
		  list: "PluginListResult",
		  detail: "PluginDetail",
		  installed: "InstalledPluginList",
		  audit: "AuditPage",
		  dependencyGraph: "DependencyGraph",
		  syncStatus: "SyncStatus",
		  settings: "StoreSettings",
		  scaffold: "ScaffoldInfo",
		  listReviews: "ReviewList"
		};
		var descriptor = (method, parameters, result) => ({
		  id: `dsh-plugin-hub#pluginStore/${method}`,
		  service: "pluginStore",
		  namespace: "pluginStore",
		  method,
		  invocation: { kind: "direct" },
		  parameters,
		  result: strict(`dsh-plugin-hub/types#${RESULT_SYMBOL[method] ?? "OpResult"}`, result)
		});
		var installedList = external_exports.array(installedPlugin).readonly();
		var descriptors = [
		  descriptor("list", [parameter("filters", filters)], pluginListResult),
		  descriptor("detail", [parameter("packageName", external_exports.string())], pluginDetail),
		  descriptor("skillList", [parameter("filters", external_exports.object({ query: external_exports.string().nullish(), category: external_exports.string().nullish(), platform: external_exports.string().nullish(), limit: external_exports.number().nullish() }).readonly().nullish())], external_exports.object({
		    total: external_exports.number(),
		    items: external_exports.array(external_exports.object({
		      id: external_exports.string(),
		      name: external_exports.string(),
		      description: external_exports.string(),
		      descriptionZh: external_exports.string(),
		      version: external_exports.string(),
		      author: external_exports.string(),
		      repoFullName: external_exports.string(),
		      categories: external_exports.array(external_exports.string()).readonly(),
		      platform: external_exports.string(),
		      installed: external_exports.boolean()
		    }).readonly()).readonly()
		  })),
		  descriptor("skillDetail", [parameter("id", external_exports.string())], external_exports.object({
		    id: external_exports.string(),
		    name: external_exports.string(),
		    description: external_exports.string(),
		    descriptionZh: external_exports.string(),
		    version: external_exports.string(),
		    author: external_exports.string(),
		    repoFullName: external_exports.string(),
		    skillPath: external_exports.string(),
		    categories: external_exports.array(external_exports.string()).readonly(),
		    platform: external_exports.string(),
		    content: external_exports.string(),
		    installed: external_exports.boolean(),
		    installedDir: external_exports.string().nullable()
		  })),
		  descriptor("skillInstall", [parameter("id", external_exports.string()), parameter("actor", external_exports.string())], opResult),
		  descriptor("skillUninstall", [parameter("name", external_exports.string()), parameter("actor", external_exports.string())], opResult),
		  descriptor("skillInstalled", [], external_exports.array(external_exports.object({
		    name: external_exports.string(),
		    dir: external_exports.string(),
		    description: external_exports.string(),
		    version: external_exports.string()
		  }).readonly()).readonly()),
		  descriptor("bench", [parameter("packageName", external_exports.string())], external_exports.object({
		    found: external_exports.boolean(),
		    updatedAt: external_exports.string().nullable(),
		    ecosystemAvg: external_exports.number().nullable(),
		    entry: external_exports.record(external_exports.string(), external_exports.unknown()).nullable()
		  })),
		  descriptor("benchRun", [parameter("packageName", external_exports.string()), parameter("mode", external_exports.enum(["mock", "e2e"]).default("mock"))], external_exports.object({
		    ok: external_exports.boolean(),
		    message: external_exports.string(),
		    detail: external_exports.object({
		      found: external_exports.boolean(),
		      updatedAt: external_exports.string().nullable(),
		      ecosystemAvg: external_exports.number().nullable(),
		      entry: external_exports.record(external_exports.string(), external_exports.unknown()).nullable()
		    }).nullable()
		  })),
		  descriptor("syncNow", [], opResult),
		  descriptor("syncStatus", [], syncStatus),
		  descriptor("settings", [], storeSettings),
		  descriptor("setGithubToken", [parameter("token", external_exports.string()), parameter("actor", external_exports.string())], opResult),
		  descriptor("clearGithubToken", [parameter("actor", external_exports.string())], opResult),
		  descriptor("setSchedule", [parameter("hours", external_exports.number()), parameter("actor", external_exports.string())], opResult),
		  descriptor("installPlugin", [parameter("packageName", external_exports.string()), parameter("actor", external_exports.string()), parameter("source", external_exports.enum(["auto", "npm", "git"]).default("auto").optional())], installReceipt),
		  descriptor("installProgress", [parameter("packageName", external_exports.string())], external_exports.object({
		    phase: external_exports.string(),
		    percent: external_exports.number().nullable(),
		    detail: external_exports.string(),
		    updatedAt: external_exports.number()
		  }).nullable()),
		  descriptor("myPlugins", [], external_exports.array(external_exports.object({
		    packageName: external_exports.string(),
		    name: external_exports.string(),
		    localPath: external_exports.string().nullable(),
		    published: external_exports.boolean(),
		    repoUrl: external_exports.string().nullable(),
		    version: external_exports.string().nullable(),
		    description: external_exports.string().nullable(),
		    pkgName: external_exports.string()
		  }).readonly()).readonly()),
		  descriptor("publish", [parameter("raw", external_exports.object({
		    packageName: external_exports.string(),
		    target: external_exports.enum(["github", "npm", "both"]).default("github"),
		    githubToken: external_exports.string().optional(),
		    npmToken: external_exports.string().optional(),
		    visibility: external_exports.enum(["public", "private"]).default("public"),
		    description: external_exports.string().optional(),
		    topics: external_exports.array(external_exports.string()).optional(),
		    writeReadme: external_exports.boolean().optional()
		  })), parameter("actor", external_exports.string())], external_exports.object({
		    ok: external_exports.boolean(),
		    message: external_exports.string(),
		    detail: external_exports.string().nullable(),
		    repoUrl: external_exports.string().nullable(),
		    npmUrl: external_exports.string().nullable(),
		    packageName: external_exports.string(),
		    security: external_exports.object({
		      level: external_exports.enum(["clean", "warning", "malicious"]),
		      findings: external_exports.array(external_exports.object({
		        severity: external_exports.enum(["critical", "warning"]),
		        rule: external_exports.string(),
		        target: external_exports.string(),
		        detail: external_exports.string()
		      }).readonly()).readonly()
		    }).optional()
		  })),
		  descriptor("publishProgress", [parameter("packageName", external_exports.string())], external_exports.object({
		    phase: external_exports.string(),
		    percent: external_exports.number().nullable(),
		    detail: external_exports.string(),
		    updatedAt: external_exports.number()
		  }).nullable()),
		  descriptor("uninstall", [parameter("packageName", external_exports.string()), parameter("actor", external_exports.string())], installReceipt),
		  descriptor("setEnabled", [parameter("packageName", external_exports.string()), parameter("enabled", external_exports.boolean()), parameter("actor", external_exports.string())], installReceipt),
		  descriptor("setCategoryEnabled", [parameter("category", external_exports.string()), parameter("enabled", external_exports.boolean()), parameter("actor", external_exports.string())], categoryToggleResult),
		  descriptor("installed", [], installedList),
		  descriptor("rate", [parameter("packageName", external_exports.string()), parameter("score", external_exports.number()), parameter("comment", external_exports.string()), parameter("actor", external_exports.string())], opResult),
		  descriptor("listReviews", [parameter("packageName", external_exports.string())], external_exports.array(reviewRow).readonly()),
		  descriptor("issues", [parameter("packageName", external_exports.string())], external_exports.array(external_exports.object({
		    number: external_exports.number(),
		    title: external_exports.string(),
		    state: external_exports.enum(["open", "closed"]),
		    comments: external_exports.number(),
		    createdAt: external_exports.string().nullable(),
		    user: external_exports.string().nullable()
		  }).readonly()).readonly()),
		  descriptor("audit", [parameter("query", auditQuery)], auditPage),
		  descriptor("dependencyGraph", [parameter("packageName", external_exports.string())], dependencyGraph),
		  descriptor("scaffold", [], scaffoldInfo),
		  descriptor("wikiHub", [parameter("filters", external_exports.object({
		    query: external_exports.string().optional(),
		    category: external_exports.string().optional(),
		    source: external_exports.string().optional(),
		    limit: external_exports.number().optional(),
		    offset: external_exports.number().optional()
		  }))], external_exports.object({
		    total: external_exports.number(),
		    items: external_exports.array(external_exports.object({
		      packageName: external_exports.string(),
		      repoFullName: external_exports.string(),
		      name: external_exports.string(),
		      developer: external_exports.string(),
		      shortDescription: external_exports.string(),
		      categories: external_exports.array(external_exports.string()).readonly(),
		      trustLevel: external_exports.string().nullable(),
		      health: external_exports.number().nullable(),
		      source: external_exports.enum(["mirror", "catalog"])
		    }).readonly()).readonly()
		  })),
		  descriptor("wiki", [parameter("packageName", external_exports.string())], external_exports.object({
		    packageName: external_exports.string(),
		    name: external_exports.string(),
		    developer: external_exports.string(),
		    repoFullName: external_exports.string().nullable(),
		    categories: external_exports.array(external_exports.string()).readonly(),
		    description: external_exports.string(),
		    shortDescription: external_exports.string(),
		    trustLevel: external_exports.string().nullable(),
		    license: external_exports.string().nullable(),
		    homepage: external_exports.string().nullable(),
		    npmInstall: external_exports.string(),
		    gitInstall: external_exports.string().nullable(),
		    usage: external_exports.string(),
		    highlights: external_exports.string(),
		    bestPractices: external_exports.string(),
		    versionCount: external_exports.number(),
		    latestVersion: external_exports.string().nullable(),
		    dependencies: external_exports.array(external_exports.object({ name: external_exports.string(), type: external_exports.string() }).readonly()).readonly(),
		    related: external_exports.array(external_exports.object({ packageName: external_exports.string(), name: external_exports.string(), developer: external_exports.string(), shortDescription: external_exports.string() }).readonly()).readonly()
		  })),
		  descriptor("healthHub", [], external_exports.object({
		    updatedAt: external_exports.string().nullable(),
		    items: external_exports.array(external_exports.object({
		      packageName: external_exports.string(),
		      name: external_exports.string(),
		      developer: external_exports.string(),
		      health: external_exports.number(),
		      level: external_exports.enum(["healthy", "attention", "stale"]),
		      rank: external_exports.number(),
		      lastUpdate: external_exports.string().nullable(),
		      downloads: external_exports.number(),
		      stars: external_exports.number(),
		      versionCount: external_exports.number(),
		      categories: external_exports.array(external_exports.string()).readonly()
		    }).readonly()).readonly()
		  })),
		  descriptor("healthDetail", [parameter("packageName", external_exports.string())], external_exports.object({
		    packageName: external_exports.string(),
		    name: external_exports.string(),
		    developer: external_exports.string(),
		    repoFullName: external_exports.string().nullable(),
		    health: external_exports.number(),
		    level: external_exports.enum(["healthy", "attention", "stale"]),
		    breakdown: external_exports.object({
		      activity: external_exports.number(),
		      distribution: external_exports.number(),
		      bugs: external_exports.number(),
		      community: external_exports.number(),
		      releases: external_exports.number()
		    }),
		    lastUpdate: external_exports.string().nullable(),
		    downloads: external_exports.number(),
		    stars: external_exports.number(),
		    openIssues: external_exports.number().nullable(),
		    timeline: external_exports.array(external_exports.object({ version: external_exports.string(), publishedAt: external_exports.string().nullable() }).readonly()).readonly(),
		    downloadTrend: external_exports.array(external_exports.object({ date: external_exports.string(), downloads: external_exports.number() }).readonly()).readonly(),
		    commitActivity: external_exports.array(external_exports.object({ date: external_exports.string(), count: external_exports.number() }).readonly()).readonly(),
		    starGains: external_exports.array(external_exports.object({ date: external_exports.string(), count: external_exports.number() }).readonly()).readonly(),
		    hasToken: external_exports.boolean()
		  }))
		];
		var TYPERT_REMOTE = { package: "dsh-plugin-hub", descriptors };

		// src/client/api.ts
		function unwrap(result) {
		  if (result.ok) return result.value;
		  throw new Error(`${result.error.code}: ${result.error.message}`);
		}
		function makeApi(remote) {
		  const r = remote.pluginStore;
		  return {
		    list: async (filters2) => unwrap(await r.list(filters2)),
		    detail: async (packageName) => unwrap(await r.detail(packageName)),
		    syncNow: async () => unwrap(await r.syncNow()),
		    syncStatus: async () => unwrap(await r.syncStatus()),
		    settings: async () => unwrap(await r.settings()),
		    setGithubToken: async (token, actor) => unwrap(await r.setGithubToken(token, actor)),
		    clearGithubToken: async (actor) => unwrap(await r.clearGithubToken(actor)),
		    setSchedule: async (hours, actor) => unwrap(await r.setSchedule(hours, actor)),
		    install: async (packageName, actor, source) => unwrap(await r.installPlugin(packageName, actor, source)),
		    installProgress: async (packageName) => unwrap(await r.installProgress(packageName)),
		    myPlugins: async () => unwrap(await r.myPlugins()),
		    publish: async (payload, actor) => unwrap(await r.publish(payload, actor)),
		    publishProgress: async (packageName) => unwrap(await r.publishProgress(packageName)),
		    uninstall: async (packageName, actor) => unwrap(await r.uninstall(packageName, actor)),
		    setEnabled: async (packageName, enabled, actor) => unwrap(await r.setEnabled(packageName, enabled, actor)),
		    setCategoryEnabled: async (category2, enabled, actor) => unwrap(await r.setCategoryEnabled(category2, enabled, actor)),
		    installed: async () => unwrap(await r.installed()),
		    rate: async (packageName, score, comment, actor) => unwrap(await r.rate(packageName, score, comment, actor)),
		    listReviews: async (packageName) => unwrap(await r.listReviews(packageName)),
		    issues: async (packageName) => unwrap(await r.issues(packageName)),
		    audit: async (query) => unwrap(await r.audit(query)),
		    dependencyGraph: async (packageName) => unwrap(await r.dependencyGraph(packageName)),
		    scaffold: async () => unwrap(await r.scaffold()),
		    healthHub: async () => unwrap(await r.healthHub()),
		    healthDetail: async (packageName) => unwrap(await r.healthDetail(packageName)),
		    wikiHub: async (filters2) => unwrap(await r.wikiHub(filters2 ?? {})),
		    wiki: async (packageName) => unwrap(await r.wiki(packageName)),
		    skillList: async (filters2) => unwrap(await r.skillList(filters2 ?? {})),
		    skillDetail: async (id) => unwrap(await r.skillDetail(id)),
		    skillInstall: async (id, actor) => unwrap(await r.skillInstall(id, actor)),
		    skillUninstall: async (name, actor) => unwrap(await r.skillUninstall(name, actor)),
		    skillInstalled: async () => unwrap(await r.skillInstalled()),
		    bench: async (packageName) => unwrap(await r.bench(packageName)),
		    benchRun: async (packageName, mode) => unwrap(await r.benchRun(packageName, mode ?? "mock"))
		  };
		}
		function createStore(initial) {
		  let value = initial;
		  const listeners = /* @__PURE__ */ new Set();
		  return {
		    getSnapshot: () => value,
		    subscribe: (listener) => {
		      listeners.add(listener);
		      return () => {
		        listeners.delete(listener);
		      };
		    },
		    set: (next) => {
		      value = next;
		      for (const l of listeners) l();
		    }
		  };
		}
		var openStoreStore = createStore(false);
		var openStore = () => openStoreStore.set(true);
		var closeStore = () => openStoreStore.set(false);
		var viewStore = createStore("discover");
		var ACTOR_KEY = "dsh.pluginStore.actor";
		function getActor() {
		  return (typeof localStorage !== "undefined" ? localStorage.getItem(ACTOR_KEY) : null) ?? "";
		}
		function setActor(name) {
		  if (typeof localStorage !== "undefined") localStorage.setItem(ACTOR_KEY, name.trim().slice(0, 64));
		}
		function actorDisplay() {
		  return getActor() || "anonymous\uFF08\u672A\u8BBE\u7F6E\u663E\u793A\u540D\uFF0C\u5C06\u4EE5\u673A\u5668\u6807\u8BC6\u8BB0\u5F55\uFF09";
		}
		function formatCount(n) {
		  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
		  if (n >= 1e4) return `${(n / 1e3).toFixed(1)}k`;
		  if (n >= 1e3) return `${(n / 1e3).toFixed(2)}k`;
		  return String(n);
		}
		function formatDate(iso) {
		  if (!iso) return "\u2014";
		  const d = new Date(iso);
		  if (Number.isNaN(d.getTime())) return iso;
		  return d.toLocaleString();
		}

		// src/client/StoreApp.tsx
		var import_react4 = require("react");
		var import_react_dom = require("react-dom");
		var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

		// src/client/views.tsx
		var import_react3 = require("react");
		var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		// src/client/markdown.tsx
		var import_react = require("react");
		var import_jsx_runtime = require("react/jsx-runtime");
		function escapeHtml(text) {
		  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
		}
		var INLINE_RE = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\))|(\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\))/g;
		function renderInline(text, keyPrefix) {
		  const nodes = [];
		  let last = 0;
		  let i = 0;
		  for (const m of text.matchAll(INLINE_RE)) {
		    const idx = m.index ?? 0;
		    if (idx > last) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: text.slice(last, idx) }, `${keyPrefix}-t${i++}`));
		    const [, code, bold, italic, , alt, imgSrc, imgTitle, , linkText, linkHref, linkTitle] = m;
		    if (code !== void 0) {
		      nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { className: "dps-md-code", children: code.slice(1, -1) }, `${keyPrefix}-c${i++}`));
		    } else if (bold !== void 0) {
		      nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: renderInline(bold.slice(2, -2), `${keyPrefix}-b`) }, `${keyPrefix}-b${i++}`));
		    } else if (italic !== void 0) {
		      nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: renderInline(italic.slice(1, -1), `${keyPrefix}-i`) }, `${keyPrefix}-i${i++}`));
		    } else if (imgSrc !== void 0) {
		      nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { className: "dps-md-img", src: imgSrc, alt: alt ?? "", title: imgTitle, loading: "lazy" }, `${keyPrefix}-img${i++}`));
		    } else if (linkHref !== void 0) {
		      nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { className: "dps-md-link", href: linkHref, title: linkTitle, target: "_blank", rel: "noreferrer", children: renderInline(linkText ?? "", `${keyPrefix}-a`) }, `${keyPrefix}-a${i++}`));
		    }
		    last = idx + m[0].length;
		  }
		  if (last < text.length) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: text.slice(last) }, `${keyPrefix}-t${i++}`));
		  return nodes;
		}
		function parseBlocks(md) {
		  const lines = md.replace(/\r\n/g, "\n").split("\n");
		  const blocks = [];
		  let i = 0;
		  while (i < lines.length) {
		    const line = lines[i];
		    const trimmed = line.trim();
		    if (!trimmed) {
		      i++;
		      continue;
		    }
		    const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
		    if (heading) {
		      blocks.push({ kind: `h${heading[1].length}`, text: heading[2] });
		      i++;
		      continue;
		    }
		    if (/^(---+|\*\*\*+)$/.test(trimmed)) {
		      blocks.push({ kind: "hr" });
		      i++;
		      continue;
		    }
		    if (trimmed.startsWith("```")) {
		      const lang = trimmed.slice(3).trim();
		      const code = [];
		      i++;
		      while (i < lines.length && !lines[i].trim().startsWith("```")) {
		        code.push(lines[i]);
		        i++;
		      }
		      i++;
		      blocks.push({ kind: "code", text: code.join("\n"), lang });
		      continue;
		    }
		    if (trimmed.startsWith(">")) {
		      const quote = [];
		      while (i < lines.length && lines[i].trim().startsWith(">")) {
		        quote.push(lines[i].trim().replace(/^>\s?/, ""));
		        i++;
		      }
		      blocks.push({ kind: "quote", text: quote.join("\n") });
		      continue;
		    }
		    if (/^[-*+]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
		      const ordered = /^\d+\.\s+/.test(trimmed);
		      const items = [];
		      while (i < lines.length) {
		        const t = lines[i].trim();
		        if (/^[-*+]\s+/.test(t) || /^\d+\.\s+/.test(t)) {
		          items.push(t.replace(/^[-*+]\s+/, "").replace(/^\d+\.\s+/, ""));
		          i++;
		        } else if (/^\s{2,}\S/.test(lines[i]) && items.length) {
		          items[items.length - 1] += ` ${lines[i].trim()}`;
		          i++;
		        } else break;
		      }
		      blocks.push(ordered ? { kind: "ol", items } : { kind: "ul", items });
		      continue;
		    }
		    if (trimmed.includes("|")) {
		      const rows = [];
		      while (i < lines.length && lines[i].trim().includes("|")) {
		        const cells = lines[i].trim().split("|").slice(1, -1).map((c) => c.trim());
		        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
		        i++;
		      }
		      if (rows.length) {
		        blocks.push({ kind: "table", rows });
		        continue;
		      }
		    }
		    const para = [trimmed];
		    i++;
		    while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,4})\s/.test(lines[i].trim()) && !lines[i].trim().startsWith("```")) {
		      para.push(lines[i].trim());
		      i++;
		    }
		    blocks.push({ kind: "p", text: para.join(" ") });
		  }
		  return blocks;
		}
		function Markdown({ text, className }) {
		  if (!text) return null;
		  const blocks = parseBlocks(text);
		  let key = 0;
		  const out = blocks.map((block) => {
		    const k = `md-${key++}`;
		    switch (block.kind) {
		      case "h1":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "dps-md-h1", children: renderInline(block.text ?? "", k) }, k);
		      case "h2":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "dps-md-h2", children: renderInline(block.text ?? "", k) }, k);
		      case "h3":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "dps-md-h3", children: renderInline(block.text ?? "", k) }, k);
		      case "h4":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "dps-md-h4", children: renderInline(block.text ?? "", k) }, k);
		      case "p":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dps-md-p", children: renderInline(block.text ?? "", k) }, k);
		      case "code":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "dps-md-pre", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { className: `dps-md-pre-code${block.lang ? ` lang-${escapeHtml(block.lang)}` : ""}`, children: block.text }) }, k);
		      case "quote":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { className: "dps-md-quote", children: renderInline(block.text ?? "", k) }, k);
		      case "ul":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "dps-md-ul", children: block.items?.map((it, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: renderInline(it, `${k}-${j}`) }, `${k}-${j}`)) }, k);
		      case "ol":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "dps-md-ol", children: block.items?.map((it, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: renderInline(it, `${k}-${j}`) }, `${k}-${j}`)) }, k);
		      case "hr":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "dps-md-hr" }, k);
		      case "table":
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dps-md-table-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", { className: "dps-md-table", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: block.rows?.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: row.map((cell, ci) => ri === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: renderInline(cell, `${k}-${ri}-${ci}`) }, ci) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: renderInline(cell, `${k}-${ri}-${ci}`) }, ci)) }, ri)) }) }) }, k);
		      default:
		        return null;
		    }
		  });
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: className ?? "dps-md", children: out });
		}

		// src/client/graph.tsx
		var import_react2 = require("react");
		var import_jsx_runtime2 = require("react/jsx-runtime");
		var NODE_W = 190;
		var NODE_H = 30;
		var GAP = 10;
		var ROOT_W = 220;
		var ROOT_H = 40;
		var MAX_SIDE = 12;
		function SideNode({ x, y, label, sub, tone, installed, onClick }) {
		  const [hover, setHover] = (0, import_react2.useState)(false);
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
		    "g",
		    {
		      transform: `translate(${x},${y})`,
		      onMouseEnter: () => setHover(true),
		      onMouseLeave: () => setHover(false),
		      onClick,
		      style: { cursor: onClick ? "pointer" : "default" },
		      children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          "rect",
		          {
		            width: NODE_W,
		            height: NODE_H,
		            rx: 8,
		            fill: tone === "dep" ? "var(--dsw-alias-interactive-bg-hover-danger, rgba(242,90,90,0.10))" : "var(--dsw-alias-interactive-bg-hover-accent, rgba(65,118,230,0.12))",
		            stroke: tone === "dep" ? "var(--dsw-alias-state-error-primary, #e05252)" : "var(--dsw-alias-brand-primary-new-colorprimary-new-color, #4176e6)",
		            strokeOpacity: hover ? 1 : 0.45,
		            strokeWidth: hover ? 1.5 : 1
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: 10, y: 13, className: "dps-graph-node-label", dominantBaseline: "middle", style: { fontWeight: hover ? 600 : 400 }, children: label.length > 26 ? `${label.slice(0, 25)}\u2026` : label }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: 10, y: 23, className: "dps-graph-node-sub", dominantBaseline: "middle", children: sub }),
		        installed !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: NODE_W - 9, cy: 9, r: 4, fill: installed ? "var(--dsw-alias-state-success-primary, #2e9e5b)" : "var(--dsw-alias-label-tertiary, #888)" })
		      ]
		    }
		  );
		}
		function DependencyGraph({ root, rootName, dependencies, dependents }) {
		  const deps = (0, import_react2.useMemo)(() => dependencies.filter((d) => d.kind === "runtime" || d.kind === "peer").slice(0, MAX_SIDE), [dependencies]);
		  const depens = (0, import_react2.useMemo)(() => dependents.slice(0, MAX_SIDE), [dependents]);
		  const extraDeps = dependencies.filter((d) => d.kind === "runtime" || d.kind === "peer").length - deps.length;
		  const extraDepens = dependents.length - depens.length;
		  const leftW = NODE_W;
		  const rightW = NODE_W;
		  const midX = leftW + 60;
		  const rootY = 40;
		  const sideH = Math.max(deps.length, depens.length, 1) * (NODE_H + GAP) - GAP;
		  const height = Math.max(sideH, ROOT_H) + rootY * 2;
		  const width = leftW + midX + 60 + rightW;
		  const depYs = deps.map((_, i) => rootY + i * (NODE_H + GAP) + NODE_H / 2);
		  const depenYs = depens.map((_, i) => rootY + i * (NODE_H + GAP) + NODE_H / 2);
		  const rootX = leftW + 60;
		  const rootCenterY = rootY + sideH / 2;
		  const rootYPos = Math.max(rootCenterY - ROOT_H / 2, 0);
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dps-graph", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { width: "100%", viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `${rootName} \u4F9D\u8D56\u62D3\u6251\u56FE`, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("defs", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("marker", { id: "dps-arrow-dep", markerWidth: "8", markerHeight: "8", refX: "7", refY: "4", orient: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M0,0 L8,4 L0,8 z", fill: "var(--dsw-alias-state-error-primary, #e05252)", opacity: "0.7" }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("marker", { id: "dps-arrow-depen", markerWidth: "8", markerHeight: "8", refX: "7", refY: "4", orient: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M0,0 L8,4 L0,8 z", fill: "var(--dsw-alias-brand-primary-new-colorprimary-new-color, #4176e6)", opacity: "0.7" }) })
		      ] }),
		      deps.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		        "path",
		        {
		          d: `M ${leftW} ${depYs[i]} C ${leftW + 30} ${depYs[i]}, ${rootX - 30} ${depYs[i]}, ${rootX} ${depYs[i]}`,
		          stroke: "var(--dsw-alias-state-error-primary, #e05252)",
		          strokeOpacity: "0.55",
		          strokeWidth: "1.2",
		          fill: "none",
		          markerEnd: "url(#dps-arrow-dep)"
		        },
		        `dep-${d.name}`
		      )),
		      depens.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		        "path",
		        {
		          d: `M ${rootX + ROOT_W} ${depenYs[i]} C ${rootX + ROOT_W + 30} ${depenYs[i]}, ${leftW + midX + 30} ${depenYs[i]}, ${leftW + midX + 60} ${depenYs[i]}`,
		          stroke: "var(--dsw-alias-brand-primary-new-colorprimary-new-color, #4176e6)",
		          strokeOpacity: "0.55",
		          strokeWidth: "1.2",
		          fill: "none",
		          markerEnd: "url(#dps-arrow-depen)"
		        },
		        `depen-${d.packageName}`
		      )),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: `translate(${rootX},${rootYPos})`, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { width: ROOT_W, height: ROOT_H, rx: 10, fill: "var(--dsw-alias-button-elevated-fill, #333)", stroke: "var(--dsw-alias-label-primary, #fff)", strokeWidth: "1.5" }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: ROOT_W / 2, y: 16, textAnchor: "middle", className: "dps-graph-root-label", dominantBaseline: "middle", children: rootName.length > 24 ? `${rootName.slice(0, 23)}\u2026` : rootName }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: ROOT_W / 2, y: 29, textAnchor: "middle", className: "dps-graph-root-sub", dominantBaseline: "middle", children: root })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("text", { x: NODE_W / 2, y: 16, textAnchor: "middle", className: "dps-graph-col-label", children: [
		        "\u4F9D\u8D56\u7684\u5E95\u5C42\u5E93 (",
		        dependencies.length,
		        ")"
		      ] }),
		      deps.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SideNode, { x: 0, y: rootY + i * (NODE_H + GAP), label: d.name, sub: d.version ?? d.kind, tone: "dep" }, d.name)),
		      extraDeps > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("text", { x: NODE_W / 2, y: rootY + deps.length * (NODE_H + GAP) + 10, textAnchor: "middle", className: "dps-graph-more", children: [
		        "\u53E6\u6709 ",
		        extraDeps,
		        " \u4E2A\u5F00\u53D1/\u5176\u4ED6\u4F9D\u8D56"
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("text", { x: leftW + midX + 60 + rightW / 2, y: 16, textAnchor: "middle", className: "dps-graph-col-label", children: [
		        "\u88AB\u4E0A\u5C42\u63D2\u4EF6\u4F9D\u8D56 (",
		        dependents.length,
		        ")"
		      ] }),
		      depens.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SideNode, { x: leftW + midX + 60, y: rootY + i * (NODE_H + GAP), label: d.name, sub: `\u8BC4\u5206 ${d.rating.toFixed(1)}${d.installed ? " \xB7 \u5DF2\u5B89\u88C5" : ""}`, tone: "depen", installed: d.installed, onClick: () => {
		        window.dispatchEvent(new CustomEvent("dps-open-plugin", { detail: d.packageName }));
		      } }, d.packageName)),
		      extraDepens > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("text", { x: leftW + midX + 60 + rightW / 2, y: rootY + depens.length * (NODE_H + GAP) + 10, textAnchor: "middle", className: "dps-graph-more", children: [
		        "\u53E6\u6709 ",
		        extraDepens,
		        " \u4E2A\u4E0A\u5C42\u63D2\u4EF6"
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dps-graph-legend", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dps-legend-item", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "dps-legend-dep" }),
		        " \u4F9D\u8D56\u7684\u5E95\u5C42\u5E93\uFF08\u5378\u8F7D\u8BE5\u63D2\u4EF6\u4E0D\u5F71\u54CD\u5B83\u4EEC\uFF09"
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dps-legend-item", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "dps-legend-depen" }),
		        " \u4F9D\u8D56\u672C\u63D2\u4EF6\u7684\u4E0A\u5C42\u63D2\u4EF6\uFF08\u5378\u8F7D\u4F1A\u5F71\u54CD\u5B83\u4EEC\uFF09"
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dps-legend-item", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "dps-legend-dot" }),
		        " \u5DF2\u5B89\u88C5"
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dps-graph-hint", children: "\u5378\u8F7D\u524D\u8BC4\u4F30\u5F71\u54CD\u8303\u56F4\uFF1A\u70B9\u51FB\u53F3\u4FA7\u8282\u70B9\u53EF\u8DF3\u8F6C\u5230\u5BF9\u5E94\u63D2\u4EF6\u8BE6\u60C5\uFF1B\u7EA2\u8272\u8FDE\u7EBF\u4E3A\u4F20\u5165\u4F9D\u8D56\uFF0C\u84DD\u8272\u8FDE\u7EBF\u4E3A\u4F20\u51FA\u4F9D\u8D56\u3002" })
		  ] });
		}

		// src/client/views.tsx
		var import_jsx_runtime3 = require("react/jsx-runtime");
		var CATEGORY_META = [
		  { key: "all", labelKey: "category.all" },
		  { key: "tool", labelKey: "category.tool" },
		  { key: "agent", labelKey: "category.agent" },
		  { key: "ui", labelKey: "category.ui" },
		  { key: "data", labelKey: "category.data" },
		  { key: "vision", labelKey: "category.vision" },
		  { key: "docs", labelKey: "category.docs" },
		  { key: "memory", labelKey: "category.memory" },
		  { key: "usage", labelKey: "category.usage" },
		  { key: "notify", labelKey: "category.notify" },
		  { key: "dev", labelKey: "category.dev" },
		  { key: "chat", labelKey: "category.chat" },
		  { key: "hub", labelKey: "category.hub" },
		  { key: "hub-ext", labelKey: "category.hubExt" },
		  { key: "other", labelKey: "category.other" }
		];
		var CATEGORY_LABEL = {
		  tool: "\u5DE5\u5177",
		  agent: "Agent",
		  ui: "\u754C\u9762\u7F8E\u5316",
		  data: "\u6570\u636E\u5904\u7406",
		  vision: "\u89C6\u89C9\u591A\u6A21\u6001",
		  docs: "\u6587\u6863\u529E\u516C",
		  memory: "\u8BB0\u5FC6\u77E5\u8BC6",
		  usage: "\u6A21\u578B\u7528\u91CF",
		  notify: "\u901A\u77E5\u901A\u8BAF",
		  dev: "\u5F00\u53D1\u7F16\u7801",
		  chat: "\u5BF9\u8BDD\u4F1A\u8BDD",
		  hub: "\u805A\u5408\u8D44\u6E90",
		  other: "\u5176\u4ED6"
		};
		function Stars({ rating, count }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-stars", title: `${rating.toFixed(1)} / 5\uFF08${count} \u6761\u8BC4\u4EF7\uFF09`, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-stars-icons", "aria-hidden": "true", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-star${rating >= i - 0.25 ? " on" : rating >= i - 0.75 ? " half" : ""}`, children: "\u2605" }, i)) }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-stars-num", children: rating > 0 ? rating.toFixed(1) : "\u6682\u65E0" }),
		    count > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-stars-count", children: [
		      "(",
		      count,
		      ")"
		    ] })
		  ] });
		}
		function PluginIcon({ iconUrl, name, size = 44 }) {
		  const initial = (name || "?").trim().charAt(0).toUpperCase();
		  return iconUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { className: "dps-icon-img", src: iconUrl, alt: "", width: size, height: size, style: { width: size, height: size }, loading: "lazy" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-icon-fallback", style: { width: size, height: size, fontSize: size * 0.42 }, children: initial });
		}
		function CategoryBadges({ categories, t }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-badges", children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-badge dps-badge-${c}`, children: t(`category.${c}`) ?? CATEGORY_LABEL[c] ?? c }, c)) });
		}
		var TRUST_META = {
		  official: { icon: "\u{1F3C5}", labelKey: "trust.official" },
		  verified: { icon: "\u2705", labelKey: "trust.verified" },
		  community: { icon: "\u{1F465}", labelKey: "trust.community" },
		  unreviewed: { icon: "\u26AA", labelKey: "trust.unreviewed" }
		};
		function TrustBadge({ level, t }) {
		  if (!level) return null;
		  const meta3 = TRUST_META[level] ?? { icon: "\u26AA", labelKey: "trust.unreviewed" };
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: `dps-badge dps-trust-${level}`, title: `${t("trust.sourceHint")}`, children: [
		    meta3.icon,
		    " ",
		    t(meta3.labelKey)
		  ] });
		}
		function SourceBadge({ source, t }) {
		  return source === "npm" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-badge dps-badge-npm", title: t("source.npm"), children: t("source.npm") }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-badge dps-badge-github", title: t("source.github"), children: t("source.github") });
		}
		function ErrorBanner({ error: error51, onDismiss, t }) {
		  const [expanded, setExpanded] = (0, import_react3.useState)(false);
		  if (!error51) return null;
		  const message = typeof error51 === "string" ? error51 : error51.message;
		  const detail = typeof error51 === "string" ? null : error51.detail;
		  const tf = t ?? ((k) => k);
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-error", role: "alert", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconWarningOutline16, { size: 16 }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-error-text", children: [
		      message,
		      detail && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-error-detail-toggle", onClick: () => setExpanded((v) => !v), children: expanded ? `${tf("err.detail.collapse")} \u25B2` : `${tf("err.detail.toggle")} \u25BC` }),
		      detail && expanded && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("pre", { className: "dps-error-detail", children: detail })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn", onClick: onDismiss, "aria-label": tf("app.close"), children: "\xD7" })
		  ] });
		}
		function Discover({ api, onOpen, onChanged, t }) {
		  const [plugins, setPlugins] = (0, import_react3.useState)([]);
		  const [total, setTotal] = (0, import_react3.useState)(0);
		  const [loading, setLoading] = (0, import_react3.useState)(true);
		  const [error51, setError] = (0, import_react3.useState)(null);
		  const [query, setQuery] = (0, import_react3.useState)("");
		  const [debounced, setDebounced] = (0, import_react3.useState)("");
		  const [category2, setCategory] = (0, import_react3.useState)("all");
		  const [sort, setSort] = (0, import_react3.useState)(() => localStorage.getItem("dps-sort") || "random");
		  const [installedOnly, setInstalledOnly] = (0, import_react3.useState)(false);
		  const [limit] = (0, import_react3.useState)(60);
		  const [offset, setOffset] = (0, import_react3.useState)(0);
		  const [busy, setBusy] = (0, import_react3.useState)(null);
		  (0, import_react3.useEffect)(() => {
		    const id = window.setTimeout(() => setDebounced(query), 250);
		    return () => window.clearTimeout(id);
		  }, [query]);
		  const load = (0, import_react3.useCallback)(async (nextOffset) => {
		    setLoading(true);
		    setError(null);
		    try {
		      const page = await api.list({
		        category: category2 === "all" ? null : category2,
		        query: debounced || null,
		        sort,
		        installedOnly: installedOnly || null,
		        limit,
		        offset: nextOffset
		      });
		      setPlugins(nextOffset === 0 ? page.plugins : (prev) => [...prev, ...page.plugins]);
		      setTotal(page.total);
		      setOffset(nextOffset);
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setLoading(false);
		    }
		  }, [api, category2, debounced, sort, installedOnly, limit]);
		  (0, import_react3.useEffect)(() => {
		    void load(0);
		  }, [load]);
		  const install = async (p) => {
		    setBusy(p.packageName);
		    try {
		      const r = await api.install(p.packageName, getActor());
		      setError(r.ok ? null : r.message);
		      if (r.ok) onChanged();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const card = (p) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-card", onClick: () => onOpen(p.packageName), role: "button", tabIndex: 0, onKeyDown: (e) => {
		    if (e.key === "Enter") onOpen(p.packageName);
		  }, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-card-top", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PluginIcon, { iconUrl: p.iconUrl, name: p.name }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-card-head", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-card-name", title: p.name, children: p.name }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-card-developer", title: p.developer, children: [
		          "@",
		          p.developer
		        ] })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-card-desc", children: p.shortDescription || "\uFF08\u6682\u65E0\u63CF\u8FF0\uFF09" }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-card-meta", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TrustBadge, { level: p.trustLevel, t }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CategoryBadges, { categories: p.categories, t }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-card-stats", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SourceBadge, { source: p.source, t }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Stars, { rating: p.rating, count: p.ratingCount }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-stat", title: t("downloads.title"), children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconDownloadOutline16, { size: 13 }),
		          p.downloads > 0 ? formatCount(p.downloads) : t("downloads.unknown")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-stat", title: "GitHub Stars", children: [
		          "\u2605 ",
		          formatCount(p.stars)
		        ] })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-card-actions", children: [
		      p.installed ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-state-chip${p.enabled === false ? " off" : ""}`, children: p.enabled === false ? t("state.disabled") : t("state.installed") }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        "button",
		        {
		          type: "button",
		          className: "dps-btn dps-btn-primary dps-btn-sm",
		          disabled: busy === p.packageName,
		          onClick: (e) => {
		            e.stopPropagation();
		            void install(p);
		          },
		          children: busy === p.packageName ? t("action.installing") : t("action.install")
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-card-version", children: p.version ? `v${p.version}` : "" })
		    ] })
		  ] }, p.packageName);
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-toolbar", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-search", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconSearchOutline16, { size: 15 }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "input",
		          {
		            className: "dps-search-input",
		            value: query,
		            placeholder: t("discover.search"),
		            onChange: (e) => setQuery(e.target.value),
		            "aria-label": t("discover.search")
		          }
		        )
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-filters", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-chips", role: "group", "aria-label": t("category.all"), children: CATEGORY_META.map((c) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "button",
		          {
		            type: "button",
		            className: `dps-chip${category2 === c.key ? " active" : ""}`,
		            onClick: () => setCategory(c.key),
		            children: t(c.labelKey)
		          },
		          c.key
		        )) }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-filter-right", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { className: "dps-select", value: sort, onChange: (e) => {
		            const v = e.target.value;
		            setSort(v);
		            localStorage.setItem("dps-sort", v);
		          }, "aria-label": t("category.tool"), children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("option", { value: "random", children: [
		              "\u{1F3B2} ",
		              t("sort.random")
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "health", children: t("sort.health") }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "stars", children: t("sort.stars") }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "rating", children: t("sort.rating") }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "downloads", children: t("sort.downloads") }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "updated", children: t("sort.updated") }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "name", children: t("sort.name") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "dps-check", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "checkbox", checked: installedOnly, onChange: (e) => setInstalledOnly(e.target.checked) }),
		            t("filter.installedOnly")
		          ] })
		        ] })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null), t }),
		    loading && offset === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: "\u52A0\u8F7D\u4E2D\u2026" }) : plugins.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-empty", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconCordisPluginOutline14, { size: 18 }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("discover.empty") }),
		      total === 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-empty-hint", children: t("discover.emptyHint") })
		    ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-grid", children: plugins.map(card) }),
		      offset + plugins.length < total && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-loadmore", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn", disabled: loading, onClick: () => void load(offset + plugins.length), children: loading ? "\u52A0\u8F7D\u4E2D\u2026" : `\u52A0\u8F7D\u66F4\u591A\uFF08${total - offset - plugins.length}\uFF09` }) })
		    ] })
		  ] });
		}
		function Detail({ api, packageName, onBack, onChanged, t }) {
		  const [detail, setDetail] = (0, import_react3.useState)(null);
		  const [loading, setLoading] = (0, import_react3.useState)(true);
		  const [error51, setError] = (0, import_react3.useState)(null);
		  const [tab, setTab] = (0, import_react3.useState)("overview");
		  const [busy, setBusy] = (0, import_react3.useState)(null);
		  const [myScore, setMyScore] = (0, import_react3.useState)(0);
		  const [myComment, setMyComment] = (0, import_react3.useState)("");
		  const [rateBusy, setRateBusy] = (0, import_react3.useState)(false);
		  const [installP, setInstallP] = (0, import_react3.useState)(null);
		  const [issues, setIssues] = (0, import_react3.useState)(null);
		  const [issuesLoading, setIssuesLoading] = (0, import_react3.useState)(false);
		  const [envHint, setEnvHint] = (0, import_react3.useState)(null);
		  const [health, setHealth] = (0, import_react3.useState)(null);
		  const [healthLoading, setHealthLoading] = (0, import_react3.useState)(false);
		  const [bench, setBench] = (0, import_react3.useState)(null);
		  const [benchLoading, setBenchLoading] = (0, import_react3.useState)(false);
		  const [benchBusy, setBenchBusy] = (0, import_react3.useState)(false);
		  const [benchMsg, setBenchMsg] = (0, import_react3.useState)(null);
		  const [benchMode, setBenchMode] = (0, import_react3.useState)("mock");
		  const [wiki, setWiki] = (0, import_react3.useState)(null);
		  const [wikiLoading, setWikiLoading] = (0, import_react3.useState)(false);
		  const [copiedCmd, setCopiedCmd] = (0, import_react3.useState)(null);
		  (0, import_react3.useEffect)(() => {
		    if (tab !== "wiki" || wiki !== null) return;
		    let cancelled = false;
		    setWikiLoading(true);
		    void api.wiki(packageName).then((w) => {
		      if (!cancelled) setWiki(w);
		    }).catch(() => {
		      if (!cancelled) setWiki(null);
		    }).finally(() => {
		      if (!cancelled) setWikiLoading(false);
		    });
		    return () => {
		      cancelled = true;
		    };
		  }, [tab, wiki, api, packageName]);
		  const copyCmd = (cmd) => {
		    void navigator.clipboard?.writeText(cmd).catch(() => void 0);
		    setCopiedCmd(cmd);
		    window.setTimeout(() => setCopiedCmd(null), 1500);
		  };
		  (0, import_react3.useEffect)(() => {
		    if (tab !== "health" || health !== null) return;
		    let cancelled = false;
		    setHealthLoading(true);
		    void api.healthDetail(packageName).then((h) => {
		      if (!cancelled) setHealth(h);
		    }).catch(() => {
		      if (!cancelled) setHealth(null);
		    }).finally(() => {
		      if (!cancelled) setHealthLoading(false);
		    });
		    return () => {
		      cancelled = true;
		    };
		  }, [tab, health, api, packageName]);
		  (0, import_react3.useEffect)(() => {
		    if (tab !== "bench" || bench !== null) return;
		    let cancelled = false;
		    setBenchLoading(true);
		    void api.bench(packageName).then((b) => {
		      if (!cancelled) setBench(b);
		    }).catch(() => {
		      if (!cancelled) setBench(null);
		    }).finally(() => {
		      if (!cancelled) setBenchLoading(false);
		    });
		    return () => {
		      cancelled = true;
		    };
		  }, [tab, bench, api, packageName]);
		  const runBenchNow = async (mode = "mock") => {
		    if (mode === "e2e" && !window.confirm(t("bench.e2eConfirm"))) return;
		    setBenchBusy(true);
		    setBenchMsg(null);
		    setBenchMode(mode);
		    try {
		      const r = await api.benchRun(packageName, mode);
		      setBenchMsg(r.message);
		      if (r.detail) {
		        setBench(r.detail);
		      } else {
		        setBench(await api.bench(packageName));
		      }
		    } catch (e) {
		      setBenchMsg(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBenchBusy(false);
		    }
		  };
		  (0, import_react3.useEffect)(() => {
		    if (tab !== "issues" || issues !== null) return;
		    let cancelled = false;
		    setIssuesLoading(true);
		    void api.issues(packageName).then((list) => {
		      if (!cancelled) setIssues(list);
		    }).catch(() => {
		      if (!cancelled) setIssues([]);
		    }).finally(() => {
		      if (!cancelled) setIssuesLoading(false);
		    });
		    return () => {
		      cancelled = true;
		    };
		  }, [tab, issues, api, packageName]);
		  (0, import_react3.useEffect)(() => {
		    if (busy !== "install") {
		      setInstallP(null);
		      return;
		    }
		    let cancelled = false;
		    const tick = async () => {
		      try {
		        const p = await api.installProgress(packageName);
		        if (!cancelled) setInstallP(p ? { phase: p.phase, percent: p.percent, detail: p.detail } : null);
		      } catch {
		      }
		    };
		    void tick();
		    const timer = setInterval(tick, 500);
		    return () => {
		      cancelled = true;
		      clearInterval(timer);
		    };
		  }, [api, packageName, busy]);
		  (0, import_react3.useEffect)(() => {
		    let cancelled = false;
		    setLoading(true);
		    setError(null);
		    api.detail(packageName).then((d) => {
		      if (!cancelled) setDetail(d);
		    }).catch((e) => {
		      if (!cancelled) setError({ message: e instanceof Error ? e.message : String(e), detail: null });
		    }).finally(() => {
		      if (!cancelled) setLoading(false);
		    });
		    return () => {
		      cancelled = true;
		    };
		  }, [api, packageName]);
		  (0, import_react3.useEffect)(() => {
		    const onOpen = (e) => {
		      const name = e.detail;
		      if (name && name !== packageName) window.dispatchEvent(new CustomEvent("dps-navigate", { detail: name }));
		    };
		    window.addEventListener("dps-open-plugin", onOpen);
		    return () => window.removeEventListener("dps-open-plugin", onOpen);
		  }, [packageName]);
		  const act = async (action, source) => {
		    setBusy(action);
		    setError(null);
		    try {
		      let r;
		      if (action === "install") r = await api.install(packageName, getActor(), source === "auto" ? void 0 : source);
		      else if (action === "uninstall") r = await api.uninstall(packageName, getActor());
		      else r = await api.setEnabled(packageName, action === "enable", getActor());
		      if (r.ok) {
		        onChanged();
		        setEnvHint(r.requiredEnv && r.requiredEnv.length > 0 ? r.requiredEnv : null);
		        const fresh = await api.detail(packageName);
		        setDetail(fresh);
		      } else {
		        setError({ message: r.message, detail: r.detail ?? null });
		      }
		    } catch (e) {
		      setError({ message: e instanceof Error ? e.message : String(e), detail: null });
		    } finally {
		      setBusy(null);
		    }
		  };
		  const submitRate = async () => {
		    if (myScore < 1) {
		      setError({ message: "\u8BF7\u5148\u9009\u62E9 1-5 \u661F\u8BC4\u5206", detail: null });
		      return;
		    }
		    setRateBusy(true);
		    try {
		      const r = await api.rate(packageName, myScore, myComment, getActor());
		      setError(r.ok ? null : { message: r.message, detail: r.detail ?? null });
		      if (r.ok) {
		        setDetail(await api.detail(packageName));
		        setMyComment("");
		      }
		    } catch (e) {
		      setError({ message: e instanceof Error ? e.message : String(e), detail: null });
		    } finally {
		      setRateBusy(false);
		    }
		  };
		  if (loading) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-view dps-empty", children: "\u52A0\u8F7D\u4E2D\u2026" });
		  if (!detail) {
		    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-view", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51 ?? "\u672A\u627E\u5230\u8BE5\u63D2\u4EF6", onDismiss: () => onBack() }) });
		  }
		  const tabs = [
		    { key: "overview", label: t("detail.tab.overview") },
		    { key: "usage", label: t("detail.tab.usage") },
		    { key: "versions", label: `${t("detail.tab.versions")}${detail.versions.length ? ` (${detail.versions.length})` : ""}` },
		    { key: "graph", label: `${t("detail.tab.graph")} (${detail.dependencies.length}/${detail.dependents.length})` },
		    { key: "reviews", label: `${t("detail.tab.reviews")}${detail.ratingCount ? ` (${detail.ratingCount})` : ""}` },
		    { key: "issues", label: t("detail.tab.issues") },
		    { key: "health", label: t("detail.tab.health") },
		    { key: "bench", label: t("detail.tab.bench") },
		    { key: "wiki", label: t("detail.tab.wiki") }
		  ];
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view dps-detail", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-detail-head", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn dps-back", onClick: onBack, "aria-label": "\u8FD4\u56DE", children: "\u2190" }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PluginIcon, { iconUrl: detail.iconUrl, name: detail.name, size: 52 }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-detail-title", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-detail-name-row", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "dps-detail-name", children: detail.name }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SourceBadge, { source: detail.source, t }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TrustBadge, { level: detail.trustLevel, t }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CategoryBadges, { categories: detail.categories, t })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-detail-sub", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
		            "@",
		            detail.developer
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
		            "v",
		            detail.version ?? "\u672A\u77E5"
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Stars, { rating: detail.rating, count: detail.ratingCount }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { title: t("downloads.title"), children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconDownloadOutline16, { size: 13 }),
		            detail.downloads > 0 ? formatCount(detail.downloads) : t("downloads.unknown")
		          ] }),
		          detail.license && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: detail.license })
		          ] })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-detail-actions", children: [
		        !detail.installed && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		          detail.hasNpm && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: busy !== null, onClick: () => void act("install", "npm"), children: busy === "install" ? t("action.installing") : t("btn.npmInstall") }),
		          detail.hasGit && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn", disabled: busy !== null, onClick: () => void act("install", "git"), children: busy === "install" ? t("action.installing") : t("btn.githubInstall") })
		        ] }),
		        detail.installed && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		          detail.hasUpdate && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: busy !== null, onClick: () => void act("install", "auto"), title: detail.installedVersion ? `v${detail.installedVersion} \u2192 v${detail.version}` : void 0, children: busy === "install" ? t("action.updating") : `\u{1F504} ${t("action.update")}${detail.version ? ` v${detail.version}` : ""}` }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		            "button",
		            {
		              type: "button",
		              className: `dps-btn${detail.enabled === false ? " dps-btn-primary" : ""}`,
		              disabled: busy !== null,
		              onClick: () => void act(detail.enabled === false ? "enable" : "disable"),
		              children: busy === "enable" || busy === "disable" ? t("action.processing") : detail.enabled === false ? t("action.enable") : t("action.disable")
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-danger", disabled: busy !== null, onClick: () => void act("uninstall"), children: busy === "uninstall" ? t("action.uninstalling") : t("action.uninstall") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "dps-btn dps-btn-ghost", href: detail.repoUrl, target: "_blank", rel: "noreferrer", children: "GitHub \u2197" })
		      ] }),
		      busy === "install" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-install-progress", role: "progressbar", "aria-valuenow": installP?.percent ?? void 0, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-install-progress-head", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-install-progress-label", children: installP?.percent == null ? t("action.installing") : `${t("action.installing")} ${installP.percent}%` }),
		          installP?.detail && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", title: installP.detail, children: installP.detail })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-install-progress-track", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "div",
		          {
		            className: `dps-install-progress-bar${installP?.percent == null ? " indeterminate" : ""}`,
		            style: installP?.percent != null ? { width: `${installP.percent}%` } : void 0
		          }
		        ) })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null), t }),
		    envHint && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-security-warning", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("install.envHintTitle") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-security-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { children: envHint.join("\u3001") }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-muted-sm", children: t("install.envHintDesc") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-ghost", onClick: () => setEnvHint(null), children: t("err.dismiss") })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-tabs", role: "tablist", children: tabs.map((tb) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		      "button",
		      {
		        type: "button",
		        role: "tab",
		        "aria-selected": tab === tb.key,
		        className: `dps-tab${tab === tb.key ? " active" : ""}`,
		        onClick: () => setTab(tb.key),
		        children: tb.label
		      },
		      tb.key
		    )) }),
		    tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-tab-body", children: [
		      detail.screenshots.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-screenshots", children: detail.screenshots.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: src, target: "_blank", rel: "noreferrer", className: "dps-screenshot", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src, alt: `\u622A\u56FE ${i + 1}`, loading: "lazy" }) }, i)) }),
		      detail.fullDescription ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Markdown, { text: detail.fullDescription }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-muted", children: "\uFF08\u8BE5\u63D2\u4EF6\u672A\u63D0\u4F9B\u8BE6\u7EC6\u63CF\u8FF0\uFF09" }),
		      detail.topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-topics", children: detail.topics.map((tp) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-topic", children: [
		        "#",
		        tp
		      ] }, tp)) })
		    ] }),
		    tab === "usage" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-tab-body", children: detail.usage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Markdown, { text: detail.usage }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "\uFF08\u672A\u4ECE README \u4E2D\u63D0\u53D6\u5230\u72EC\u7ACB\u7684\u4F7F\u7528\u8BF4\u660E\u7AE0\u8282\uFF0C\u8BF7\u53C2\u8003\u300C\u6982\u89C8\u300D\u4E2D\u7684\u5B8C\u6574 README\u3002\uFF09" }) }) }),
		    tab === "versions" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-tab-body", children: detail.versions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "\u6682\u65E0\u7248\u672C\u8BB0\u5F55\uFF08GitHub Releases \u4E3A\u7A7A\u65F6\u663E\u793A package.json \u4E2D\u7684\u7248\u672C\uFF09\u3002" }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("table", { className: "dps-table", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("tr", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: "\u7248\u672C" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: "\u53D1\u5E03\u65E5\u671F" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: "\u6807\u7B7E" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: "\u53D8\u66F4\u8BF4\u660E" })
		      ] }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tbody", { children: detail.versions.map((v) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("tr", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("td", { className: "dps-strong", children: [
		          "v",
		          v.version
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { children: formatDate(v.publishedAt) }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { children: v.tagName ?? "\u2014" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { className: "dps-cell-ellipsis", title: v.changelog ?? "", children: v.changelog ? v.changelog.split("\n")[0] : "\u2014" })
		      ] }, `${v.version}-${v.publishedAt ?? ""}`)) })
		    ] }) }),
		    tab === "graph" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-tab-body", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DependencyGraph, { root: detail.packageName, rootName: detail.name, dependencies: detail.dependencies, dependents: detail.dependents }) }),
		    tab === "reviews" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-tab-body", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-rate-box", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-rate-title", children: [
		          "\u4E3A\u300C",
		          detail.name,
		          "\u300D\u8BC4\u5206\uFF08\u672C\u5730\u4F01\u4E1A\u5185\u90E8\u53CD\u9988\uFF0C\u4EC5\u672C\u673A\u53EF\u89C1\uFF09"
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-rate-row", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-star-input", role: "radiogroup", "aria-label": "\u8BC4\u5206", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: `dps-star-btn${s <= myScore ? " on" : ""}`, onClick: () => setMyScore(s), "aria-label": `${s} \u661F`, children: "\u2605" }, s)) }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		            "input",
		            {
		              className: "dps-input dps-rate-comment",
		              value: myComment,
		              placeholder: "\u5199\u4E0B\u4F7F\u7528\u53CD\u9988\uFF08\u53EF\u9009\uFF09",
		              maxLength: 2e3,
		              onChange: (e) => setMyComment(e.target.value)
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: rateBusy, onClick: () => void submitRate(), children: rateBusy ? "\u63D0\u4EA4\u4E2D\u2026" : "\u63D0\u4EA4\u8BC4\u5206" })
		        ] })
		      ] }),
		      detail.reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "\u6682\u65E0\u5185\u90E8\u8BC4\u4EF7\uFF0C\u6210\u4E3A\u7B2C\u4E00\u4E2A\u53CD\u9988\u7684\u4EBA\u5427\u3002" }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", { className: "dps-reviews", children: detail.reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { className: "dps-review", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-review-head", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconUserOutline16, { size: 15 }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-review-actor", children: r.actor }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-stars-icons", "aria-hidden": "true", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-star${i < r.score ? " on" : ""}`, children: "\u2605" }, i)) }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-review-time", children: formatDate(r.createdAt) })
		        ] }),
		        r.comment && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-review-comment", children: r.comment })
		      ] }, r.id)) })
		    ] }),
		    tab === "issues" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-tab-body", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-issues-head", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("issues.desc") }),
		        detail.repoUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("a", { className: "dps-btn dps-btn-ghost", href: `${detail.repoUrl}/issues`, target: "_blank", rel: "noreferrer", children: [
		          t("issues.openBoard"),
		          " \u2197"
		        ] })
		      ] }),
		      issuesLoading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: t("issues.loading") }) : issues === null || issues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("issues.empty") }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", { className: "dps-issues", children: issues.map((issue2) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { className: "dps-issue", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("a", { className: "dps-issue-link", href: detail.repoUrl ? `${detail.repoUrl}/issues/${issue2.number}` : void 0, target: "_blank", rel: "noreferrer", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-issue-state ${issue2.state}`, title: issue2.state === "open" ? "open" : "closed", children: issue2.state === "open" ? "\u{1F7E2}" : "\u{1F535}" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-issue-title", children: [
		            "#",
		            issue2.number,
		            " ",
		            issue2.title
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm dps-issue-meta", children: [
		          "\u{1F4AC} ",
		          issue2.comments,
		          " \xB7 @",
		          issue2.user ?? "ghost",
		          " \xB7 ",
		          issue2.createdAt ? formatDate(issue2.createdAt) : ""
		        ] })
		      ] }, issue2.number)) })
		    ] }),
		    tab === "health" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-tab-body", children: healthLoading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: t("health.loading") }) : !health ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("health.noDetail") }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metrics", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("health.title") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-h-level", style: { color: (HEALTH_META[health.level] ?? HEALTH_META.stale).color }, children: [
		            "\u25CF ",
		            (HEALTH_META[health.level] ?? HEALTH_META.stale).label,
		            " ",
		            health.health,
		            "/100"
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("health.lastUpdate") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: health.lastUpdate ? formatDate(health.lastUpdate) : "\u2014" })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("health.downloads") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: formatCount(health.downloads) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("health.openIssues") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: health.openIssues ?? "\u2014" })
		        ] }),
		        health.repoFullName && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "dps-h-metric dps-h-repo", href: `https://github.com/${health.repoFullName}`, target: "_blank", rel: "noreferrer", children: "GitHub \u2197" })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("health.breakdown") }),
		        [
		          [t("health.act"), health.breakdown.activity, 30],
		          [t("health.dist"), health.breakdown.distribution, 15],
		          [t("health.bugs"), health.breakdown.bugs, 25],
		          [t("health.comm"), health.breakdown.community, 20],
		          [t("health.rel"), health.breakdown.releases, 10]
		        ].map(([label, score, max]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-bar-row", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-bar-label", children: label }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-bar-track", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `dps-h-bar-fill lv-${health.level}`, style: { width: `${score / max * 100}%` } }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-h-bar-val", children: [
		            score,
		            "/",
		            max
		          ] })
		        ] }, label))
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("health.timeline") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-hint", children: t("health.timelineHint") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HealthTimeline, { timeline: health.timeline, trend: health.downloadTrend, t })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("health.changeTrend") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-hint", children: t("health.changeTrendHint") }),
		        health.hasToken ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          TrendChart,
		          {
		            series: [
		              { key: "commits", label: t("health.commitsPerDay"), color: "#378ADD", points: health.commitActivity },
		              { key: "stars", label: t("health.starsPerDay"), color: "#e0a020", points: health.starGains }
		            ],
		            t
		          }
		        ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		            TrendChart,
		            {
		              series: [{ key: "commits", label: t("health.commitsPerDay"), color: "#378ADD", points: health.commitActivity }],
		              t
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-security-warning", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("health.starsNeedToken") }) })
		        ] })
		      ] })
		    ] }) }),
		    tab === "bench" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-tab-body", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-bench-actions", style: { marginBottom: 10, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: benchBusy, onClick: () => void runBenchNow("mock"), children: benchBusy && benchMode === "mock" ? t("bench.running") : t("bench.runNow") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn", disabled: benchBusy, onClick: () => void runBenchNow("e2e"), children: benchBusy && benchMode === "e2e" ? t("bench.e2eRunning") : t("bench.e2e") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: t("bench.runHint") })
		      ] }),
		      benchMsg && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-security-warning", style: { marginBottom: 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: benchMsg }) }),
		      benchLoading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: t("bench.loading") }) : !bench || !bench.found || !bench.entry ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-empty", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("bench.noEntry") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-muted-sm", children: t("bench.hint") })
		      ] }) : (() => {
		        const e = bench.entry;
		        const level = String(e.level ?? "\u2014");
		        const color = level === "fast" ? "#4ade80" : level === "medium" ? "#facc15" : level === "slow" ? "#f87171" : "#8b93a3";
		        const bars = [
		          [t("bench.wall"), e.wallMs != null ? `${e.wallMs}ms` : "\u2014", e.wallMs != null ? Math.min(100, e.wallMs / 40) : 0],
		          [t("bench.apply"), e.probeApplyMs != null ? `${Number(e.probeApplyMs).toFixed(1)}s` : "\u2014", e.probeApplyMs != null ? Math.min(100, Number(e.probeApplyMs) * 10) : 0],
		          [t("bench.bundle"), e.bundle?.clientGzipKb != null ? `${e.bundle.clientGzipKb}KB` : "\u65E0", e.bundle?.clientGzipKb != null ? Math.min(100, e.bundle.clientGzipKb / 15) : 0],
		          [t("bench.hooks"), e.hookCount != null ? String(e.hookCount) : "\u2014", e.hookCount != null ? Math.min(100, e.hookCount * 2) : 0]
		        ];
		        return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metrics", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("bench.score") }),
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-h-level", style: { color }, children: [
		                "\u25CF ",
		                level,
		                " ",
		                e.score ?? "\u2014",
		                "/100"
		              ] })
		            ] }),
		            bench.updatedAt && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("bench.updated") }),
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: formatDate(bench.updatedAt) })
		            ] }),
		            bench.ecosystemAvg != null && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("bench.ecoAvg") }),
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
		                bench.ecosystemAvg,
		                "/100"
		              ] })
		            ] })
		          ] }),
		          e.error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-security-warning", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
		            t("bench.failed"),
		            ": ",
		            String(e.error)
		          ] }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("bench.metrics") }),
		            bars.map(([label, val, pct]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-bar-row", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-bar-label", children: label }),
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-bar-track", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-bar-fill lv-healthy", style: { width: `${pct}%` } }) }),
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-bar-val", children: val })
		            ] }, label))
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-muted-sm", children: t("bench.note") })
		        ] });
		      })()
		    ] }),
		    tab === "wiki" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-tab-body", children: wikiLoading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: t("wiki.loading") }) : !wiki ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("wiki.noEntry") }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-wiki-head", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-wiki-name", children: [
		            wiki.name,
		            " ",
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              "@",
		              wiki.developer
		            ] })
		          ] }),
		          wiki.shortDescription && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-wiki-desc", children: wiki.shortDescription })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TrustBadge, { level: wiki.trustLevel, t })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("details", { className: "dps-wiki-install", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("summary", { className: "dps-wiki-install-summary", children: [
		          t("wiki.install"),
		          " ",
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: t("wiki.installHint") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-wiki-install-body", children: [
		          wiki.npmInstall && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-cmd", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("code", { className: "dps-cmd-code", children: [
		              "dsh plugin add ",
		              wiki.npmInstall
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn", onClick: () => copyCmd(`dsh plugin add ${wiki.npmInstall}`), "aria-label": t("scaffold.copyAria"), title: t("scaffold.copy"), children: copiedCmd === `dsh plugin add ${wiki.npmInstall}` ? "\u2713" : t("scaffold.copy") })
		          ] }),
		          wiki.gitInstall && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-cmd", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("code", { className: "dps-cmd-code", children: [
		              "dsh plugin add ",
		              wiki.gitInstall
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn", onClick: () => copyCmd(`dsh plugin add ${wiki.gitInstall}`), "aria-label": t("scaffold.copyAria"), title: t("scaffold.copy"), children: copiedCmd === `dsh plugin add ${wiki.gitInstall}` ? "\u2713" : t("scaffold.copy") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-wiki-facts", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              t("wiki.latestVer"),
		              " ",
		              wiki.latestVersion ?? "\u2014"
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              t("wiki.verCount"),
		              " ",
		              wiki.versionCount
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              t("wiki.deps"),
		              " ",
		              wiki.dependencies.length
		            ] }),
		            wiki.license && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: wiki.license })
		            ] }),
		            wiki.homepage && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("a", { className: "dps-wiki-link", href: wiki.homepage, target: "_blank", rel: "noreferrer", children: [
		              t("wiki.homepage"),
		              " \u2197"
		            ] })
		          ] })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("wiki.what") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-wiki-text", children: wiki.description || wiki.shortDescription || "\u2014" })
		      ] }),
		      wiki.highlights && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("wiki.highlights") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-wiki-markdown", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Markdown, { text: wiki.highlights }) })
		      ] }),
		      wiki.usage && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("wiki.howto") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-wiki-markdown", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Markdown, { text: wiki.usage }) })
		      ] }),
		      wiki.bestPractices && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("wiki.bestPractices") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-wiki-markdown", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Markdown, { text: wiki.bestPractices }) })
		      ] }),
		      wiki.related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("wiki.related") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-list", children: wiki.related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-row", role: "button", tabIndex: 0, onClick: () => {
		          setWiki(null);
		          onChanged();
		          window.dispatchEvent(new CustomEvent("dps-open-plugin", { detail: r.packageName }));
		        }, onKeyDown: (e) => {
		          if (e.key === "Enter") {
		            setWiki(null);
		            window.dispatchEvent(new CustomEvent("dps-open-plugin", { detail: r.packageName }));
		          }
		        }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-row-main", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-row-name", children: [
		            r.name,
		            " ",
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              "@",
		              r.developer
		            ] })
		          ] }),
		          r.shortDescription && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-row-meta", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: r.shortDescription.slice(0, 80) }) })
		        ] }) }, r.packageName)) })
		      ] })
		    ] }) })
		  ] });
		}
		var INSTALLED_GROUP_LABEL = {
		  core: "\u6838\u5FC3\u670D\u52A1",
		  ui: "\u754C\u9762\u589E\u5F3A",
		  tool: "\u5F00\u53D1\u5DE5\u5177",
		  llm: "\u6A21\u578B\u4E0E LLM",
		  agent: "Agent",
		  workflow: "\u5DE5\u4F5C\u6D41",
		  data: "\u6570\u636E\u5904\u7406",
		  notification: "\u901A\u77E5",
		  hubExt: "\u53EF\u6269\u5C55\u7C7B",
		  other: "\u5176\u4ED6"
		};
		function Installed({ api, onOpen, t }) {
		  const [list, setList] = (0, import_react3.useState)(null);
		  const [error51, setError] = (0, import_react3.useState)(null);
		  const [busy, setBusy] = (0, import_react3.useState)(null);
		  const [catBusy, setCatBusy] = (0, import_react3.useState)(null);
		  const [collapsed, setCollapsed] = (0, import_react3.useState)({});
		  const load = (0, import_react3.useCallback)(async () => {
		    setList(null);
		    try {
		      setList(await api.installed());
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    }
		  }, [api]);
		  (0, import_react3.useEffect)(() => {
		    void load();
		  }, [load]);
		  const toggle = async (p) => {
		    setBusy(p.packageName);
		    try {
		      const r = await api.setEnabled(p.packageName, !p.enabled, getActor());
		      setError(r.ok ? null : r.message);
		      if (r.ok) await load();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const remove = async (p) => {
		    const isSelf = p.packageName === "dsh-plugin-hub";
		    const msg = isSelf ? `\u786E\u5B9A\u5378\u8F7D\u63D2\u4EF6\u5546\u5E97\uFF08dsh-plugin-hub\uFF09\uFF1F

		\u5378\u8F7D\u540E\u63D2\u4EF6\u5546\u5E97\u5C06\u4E0D\u518D\u53EF\u7528\uFF0C\u5982\u9700\u6062\u590D\u8BF7\u91CD\u65B0\u5B89\u88C5\u3002` : `\u786E\u5B9A\u5378\u8F7D ${p.packageName}\uFF1F\u5378\u8F7D\u540E\u5C06\u79FB\u9664\u8BE5\u63D2\u4EF6\u53CA\u5176\u6761\u76EE\u3002`;
		    if (!window.confirm(msg)) return;
		    setBusy(p.packageName);
		    try {
		      const r = await api.uninstall(p.packageName, getActor());
		      setError(r.ok ? null : r.message);
		      if (r.ok) await load();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const toggleCategory = async (cat, enabled) => {
		    setCatBusy(cat);
		    try {
		      const r = await api.setCategoryEnabled(cat, enabled, getActor());
		      setError(r.ok ? null : r.message);
		      if (r.ok) await load();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setCatBusy(null);
		    }
		  };
		  const switchCtl = (p) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		    "button",
		    {
		      type: "button",
		      role: "switch",
		      "aria-checked": p.enabled,
		      className: `dps-switch${p.enabled ? " on" : ""}${p.protected ? " locked" : ""}`,
		      disabled: busy === p.packageName || p.protected,
		      onClick: (e) => {
		        e.stopPropagation();
		        void toggle(p);
		      },
		      title: p.protected ? t("installed.protected") : p.enabled ? t("action.disable") : t("action.enable"),
		      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-switch-knob" })
		    }
		  );
		  const renderGroup = (cat, group, label, items) => {
		    const key = `${cat}:${group}`;
		    const isCollapsed = collapsed[key] === true;
		    const allOn = items.length > 0 && items.every((p) => p.enabled);
		    const anyOn = items.some((p) => p.enabled);
		    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-inst-group", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-inst-group-head", role: "button", tabIndex: 0, onClick: () => setCollapsed((c) => ({ ...c, [key]: !c[key] })), onKeyDown: (e) => {
		        if (e.key === "Enter") setCollapsed((c) => ({ ...c, [key]: !c[key] }));
		      }, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-inst-caret", children: isCollapsed ? "\u25B8" : "\u25BE" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-inst-group-label", children: label }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-inst-group-count", children: [
		          items.length,
		          " ",
		          t("installed.items")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-inst-group-state", children: allOn ? t("installed.allEnable") : anyOn ? t("installed.partialEnable") : t("action.disable") })
		      ] }),
		      !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-inst-group-body", children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `dps-inst-row${p.enabled ? "" : " off"}`, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-inst-info", role: "button", tabIndex: 0, onClick: () => onOpen(p.packageName), onKeyDown: (e) => {
		          if (e.key === "Enter") onOpen(p.packageName);
		        }, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-inst-name", title: p.packageName, children: p.name }),
		          p.localPath && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-inst-path", title: p.localPath, children: [
		            "\u{1F4C1} ",
		            p.localPath
		          ] }),
		          p.category === "own" && p.published && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "dps-badge dps-badge-npm", href: p.repoUrl ?? `https://www.npmjs.com/package/${encodeURIComponent(p.packageName)}`, target: "_blank", rel: "noreferrer", onClick: (e) => e.stopPropagation(), title: p.repoUrl ?? "npm \u5DF2\u53D1\u5E03", children: "\u{1F4E6} \u5DF2\u53D1\u5E03" }),
		          p.category === "own" && !p.published && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-badge dps-badge-own-unpub", title: "\u672C\u5730\u5F00\u53D1\u4E2D\uFF0C\u5C1A\u672A\u53D1\u5E03\u5230 npm", children: "\u{1F4DD} \u672A\u53D1\u5E03" }),
		          p.hasUpdate && p.latestVersion && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-badge dps-badge-update", title: `${t("installed.updateTitle")} v${p.latestVersion}`, children: [
		            "\u{1F504} v",
		            p.latestVersion
		          ] }),
		          p.managed && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-badge dps-badge-npm", children: t("installed.managed") }),
		          p.protected && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-badge dps-badge-github", children: t("installed.protected") }),
		          !p.managed && !p.protected && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: t("installed.unmanaged") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-inst-actions", children: [
		          switchCtl(p),
		          !p.protected && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn", title: p.packageName === "dsh-plugin-hub" ? "\u5378\u8F7D\u63D2\u4EF6\u5546\u5E97" : t("action.uninstall"), disabled: busy === p.packageName, onClick: () => void remove(p), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconTrashOutline16, { size: 14 }) })
		        ] })
		      ] }, p.packageName)) })
		    ] }, key);
		  };
		  const renderCategory = (cat, title, desc, items) => {
		    const allOn = items.length > 0 && items.every((p) => p.enabled || p.protected);
		    const groups = /* @__PURE__ */ new Map();
		    for (const p of items) {
		      const g = p.group || "other";
		      if (!groups.has(g)) groups.set(g, []);
		      groups.get(g).push(p);
		    }
		    const order = cat === "system" ? ["core", "ui", "tool", "other"] : ["core", "ui", "tool", "llm", "agent", "workflow", "data", "notification", "other"];
		    const groupKeys = [...groups.keys()].sort((a, b) => {
		      const ia = order.indexOf(a);
		      const ib = order.indexOf(b);
		      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
		    });
		    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dps-inst-cat", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-inst-cat-head", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-inst-cat-title", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { children: title }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: desc })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-inst-cat-actions", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-state-chip${allOn ? "" : " off"}`, children: allOn ? t("installed.allEnable") : t("installed.partialEnable") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-sm", disabled: catBusy === cat, onClick: () => void toggleCategory(cat, !allOn), children: catBusy === cat ? t("action.processing") : allOn ? t("action.disable") : t("installed.allEnable") })
		        ] })
		      ] }),
		      groupKeys.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty dps-empty-sm", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
		        "\u6682\u65E0",
		        title
		      ] }) }) : groupKeys.map((g) => renderGroup(cat, g, t(`installed.group.${g}`) !== `installed.group.${g}` ? t(`installed.group.${g}`) : INSTALLED_GROUP_LABEL[g] ?? groups.get(g)[0]?.groupLabel ?? g, groups.get(g)))
		    ] });
		  };
		  const system = (list ?? []).filter((p) => p.category === "system");
		  const download = (list ?? []).filter((p) => p.category === "download");
		  const own = (list ?? []).filter((p) => p.category === "own");
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view-head", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "dps-view-title", children: t("installed.title") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn", onClick: () => void load(), "aria-label": t("app.close"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconRefreshOutline16, { size: 15 }) })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null), t }),
		    list === null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: "\u52A0\u8F7D\u4E2D\u2026" }) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "\u5C1A\u672A\u5B89\u88C5\u4EFB\u4F55\u63D2\u4EF6\u3002\u524D\u5F80\u300C\u53D1\u73B0\u300D\u6D4F\u89C8\u5E76\u4E00\u952E\u5B89\u88C5\u3002" }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-inst", children: [
		      renderCategory("system", t("installed.system"), t("installed.coreDesc"), system),
		      renderCategory("download", t("installed.download"), t("installed.downloadDesc"), download),
		      renderCategory("own", t("installed.own"), t("installed.ownDesc"), own)
		    ] })
		  ] });
		}
		function Settings({ api, t }) {
		  const [settings, setSettings] = (0, import_react3.useState)(null);
		  const [status, setStatus] = (0, import_react3.useState)(null);
		  const [token, setToken] = (0, import_react3.useState)("");
		  const [hours, setHours] = (0, import_react3.useState)("24");
		  const [actor, setActorName] = (0, import_react3.useState)(actorDisplay());
		  const [error51, setError] = (0, import_react3.useState)(null);
		  const [notice, setNotice] = (0, import_react3.useState)(null);
		  const [busy, setBusy] = (0, import_react3.useState)(null);
		  const refresh = (0, import_react3.useCallback)(async () => {
		    try {
		      const [s, st] = await Promise.all([api.settings(), api.syncStatus()]);
		      setSettings(s);
		      setStatus(st);
		      setHours(String(st.scheduleHours));
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    }
		  }, [api]);
		  (0, import_react3.useEffect)(() => {
		    void refresh();
		  }, [refresh]);
		  (0, import_react3.useEffect)(() => {
		    if (status?.state !== "syncing") return;
		    const id = window.setInterval(() => {
		      void refresh();
		    }, 1500);
		    return () => window.clearInterval(id);
		  }, [status?.state, refresh]);
		  const saveToken = async () => {
		    setBusy("token");
		    setNotice(null);
		    try {
		      const r = await api.setGithubToken(token, getActor());
		      if (r.ok) {
		        setToken("");
		        setNotice(r.message);
		        await refresh();
		      } else setError(r.message);
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const clearToken = async () => {
		    setBusy("token");
		    try {
		      const r = await api.clearGithubToken(getActor());
		      setNotice(r.ok ? r.message : null);
		      setError(r.ok ? null : r.message);
		      await refresh();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const saveSchedule = async () => {
		    setBusy("schedule");
		    try {
		      const r = await api.setSchedule(Number(hours), getActor());
		      setNotice(r.ok ? r.message : null);
		      setError(r.ok ? null : r.message);
		      await refresh();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const syncNow = async () => {
		    setBusy("sync");
		    setNotice(null);
		    try {
		      const r = await api.syncNow();
		      setError(r.ok ? null : r.message);
		      setNotice(r.ok ? r.message : null);
		      await refresh();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const saveActor = () => {
		    setActor(actor);
		    setNotice(t("settings.tokenSaved") + "\uFF1A" + actor);
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view dps-settings", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "dps-view-title", children: t("settings.title") }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null) }),
		    notice && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-notice", children: notice }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dps-section", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("h4", { className: "dps-section-title", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconUserOutline16, { size: 15 }),
		        " ",
		        t("settings.operator")
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { className: "dps-input", value: actor, placeholder: t("settings.anonymous"), maxLength: 64, onChange: (e) => setActorName(e.target.value) }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn", onClick: saveActor, children: t("settings.saveActor") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-hint", children: t("settings.operatorHint") })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dps-section", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("h4", { className: "dps-section-title", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconSettingsOutline16, { size: 15 }),
		        " ",
		        t("settings.githubToken")
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-hint", dangerouslySetInnerHTML: { __html: t("settings.githubTokenHint") } }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { className: "dps-input", type: "password", value: token, placeholder: settings?.tokenConfigured ? `\u5DF2\u914D\u7F6E\uFF1A${settings.tokenMasked}` : t("settings.tokenPlaceholder") + "\uFF08ghp_\u2026\uFF09", onChange: (e) => setToken(e.target.value), autoComplete: "off" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: busy === "token" || !token.trim(), onClick: () => void saveToken(), children: t("settings.saveToken") }),
		        settings?.tokenConfigured && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-danger", disabled: busy === "token", onClick: () => void clearToken(), children: t("settings.clearToken") })
		      ] }),
		      settings && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "dps-hint", children: [
		        "\u5F53\u524D\u989D\u5EA6\uFF1A",
		        settings.rateLimitRemaining === null ? t("settings.uncached") : `\u5269\u4F59 ${settings.rateLimitRemaining} \u6B21\uFF08\u6838\u5FC3\uFF09`,
		        " \xB7 ",
		        t("settings.plugins"),
		        "\uFF1A",
		        settings.pluginCount,
		        " \xB7",
		        t("settings.dbPath"),
		        "\uFF1A",
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { children: settings.dbPath })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dps-section", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("h4", { className: "dps-section-title", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconRefreshOutline16, { size: 15 }),
		        " ",
		        t("settings.mirror")
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-hint", dangerouslySetInnerHTML: { __html: t("settings.mirrorHint") } }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "dps-inline-label", children: t("settings.syncInterval") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { className: "dps-input dps-input-num", type: "number", min: 0, max: 168, value: hours, onChange: (e) => setHours(e.target.value) }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn", disabled: busy === "schedule", onClick: () => void saveSchedule(), children: t("settings.savePlan") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: busy === "sync" || status?.state === "syncing", onClick: () => void syncNow(), children: status?.state === "syncing" ? "\u540C\u6B65\u4E2D\u2026" : t("settings.syncNow") })
		      ] }),
		      status && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-status", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-status-line", children: [
		          t("audit.action"),
		          "\uFF1A",
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-state-chip${status.state === "error" ? " off" : ""}`, children: status.state === "syncing" ? "\u540C\u6B65\u4E2D" : status.state === "error" ? "\u51FA\u9519" : t("settings.idle") }),
		          status.lastSyncAt && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		            " \xB7 ",
		            t("settings.lastSync"),
		            "\uFF1A",
		            formatDate(status.lastSyncAt),
		            "\uFF08",
		            status.lastSyncTotal,
		            " ",
		            t("settings.plugins"),
		            "\uFF09"
		          ] }),
		          status.nextSyncAt && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		            " \xB7 ",
		            t("settings.nextPlan"),
		            "\uFF1A",
		            formatDate(status.nextSyncAt)
		          ] })
		        ] }),
		        status.lastError && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-status-error", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconWarningOutline16, { size: 14 }),
		          " ",
		          status.lastError
		        ] })
		      ] })
		    ] })
		  ] });
		}
		function Audit({ api, t }) {
		  const [page, setPage] = (0, import_react3.useState)(null);
		  const [error51, setError] = (0, import_react3.useState)(null);
		  const [action, setAction] = (0, import_react3.useState)("");
		  const [actor, setActorFilter] = (0, import_react3.useState)("");
		  const [target, setTarget] = (0, import_react3.useState)("");
		  const [offset, setOffset] = (0, import_react3.useState)(0);
		  const [reload, setReload] = (0, import_react3.useState)(0);
		  const LIMIT = 50;
		  (0, import_react3.useEffect)(() => {
		    let cancelled = false;
		    api.audit({ action: action || null, actor: actor || null, target: target || null, limit: LIMIT, offset }).then((p) => {
		      if (!cancelled) setPage(p);
		    }).catch((e) => {
		      if (!cancelled) setError(e instanceof Error ? e.message : String(e));
		    });
		    return () => {
		      cancelled = true;
		    };
		  }, [api, action, actor, target, offset, reload]);
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view-head", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "dps-view-title", children: t("audit.title") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn", onClick: () => setReload((n) => n + 1), "aria-label": t("app.close"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconRefreshOutline16, { size: 15 }) })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-toolbar dps-toolbar-inline", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { className: "dps-select", value: action, onChange: (e) => {
		        setAction(e.target.value);
		        setOffset(0);
		      }, "aria-label": t("audit.byActor"), children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "", children: t("audit.allActions") }),
		        ["install", "uninstall", "enable", "disable", "rate", "tokenSet", "tokenClear", "sync", "scheduleSet"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: k, children: t(`audit.${k}`) }, k))
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { className: "dps-input dps-input-sm", placeholder: t("audit.byActor"), value: actor, onChange: (e) => {
		        setActorFilter(e.target.value);
		        setOffset(0);
		      } }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { className: "dps-input dps-input-sm", placeholder: t("audit.byTarget"), value: target, onChange: (e) => {
		        setTarget(e.target.value);
		        setOffset(0);
		      } })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null) }),
		    page === null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: "\u52A0\u8F7D\u4E2D\u2026" }) : page.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("audit.time") === t("audit.time") ? "\u6682\u65E0\u5BA1\u8BA1\u8BB0\u5F55\u3002" : "No audit records." }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("table", { className: "dps-table", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("tr", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: t("audit.time") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: t("audit.actor") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: t("audit.action") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: t("audit.target") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: t("audit.result") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("th", { children: t("audit.detail") })
		        ] }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tbody", { children: page.rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("tr", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { className: "dps-cell-nowrap", children: formatDate(r.createdAt) }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { className: "dps-strong", children: r.actor }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-action-chip${r.action === "install" || r.action === "enable" ? "" : " alt"}`, children: t(`audit.${r.action}`) !== `audit.${r.action}` ? t(`audit.${r.action}`) : r.action }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { className: "dps-cell-ellipsis", title: r.target, children: r.target }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-result-chip${r.result === "ok" ? "" : " fail"}`, children: r.result === "ok" ? t("audit.ok") : t("audit.failed") }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("td", { className: "dps-cell-ellipsis", title: r.message, children: r.message })
		        ] }, r.id)) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-pager", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-sm", disabled: offset === 0, onClick: () => setOffset(Math.max(0, offset - LIMIT)), children: "\u4E0A\u4E00\u9875" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-pager-info", children: [
		          offset + 1,
		          "\u2013",
		          Math.min(offset + LIMIT, page.total),
		          " / \u5171 ",
		          page.total,
		          " \u6761"
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-sm", disabled: offset + LIMIT >= page.total, onClick: () => setOffset(offset + LIMIT), children: "\u4E0B\u4E00\u9875" })
		      ] })
		    ] })
		  ] });
		}
		var PUBLISH_TOPIC_PRESETS = ["dsh-plugin", "deepseek", "agent", "tool", "ui", "data", "workflow", "llm"];
		function renderMarkdown(md) {
		  let s = String(md ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		  const codeBlocks = [];
		  s = s.replace(/```([\s\S]*?)```/g, (_m, code) => {
		    let c = code.trim();
		    const lines = c.split("\n");
		    if (lines.length > 1 && /^[a-zA-Z0-9_+-]{1,20}$/.test(lines[0].trim())) c = lines.slice(1).join("\n");
		    codeBlocks.push(c);
		    return `\0DPSCODE${codeBlocks.length - 1}\0`;
		  });
		  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="dps-md-img" src="$2" alt="$1" loading="lazy" />');
		  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="dps-md-link" href="$2" target="_blank" rel="noreferrer">$1</a>');
		  s = s.replace(/^### (.*)$/gm, "<h4>$1</h4>");
		  s = s.replace(/^## (.*)$/gm, "<h3>$1</h3>");
		  s = s.replace(/^# (.*)$/gm, "<h2>$1</h2>");
		  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
		  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
		  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
		  s = s.replace(/^\s*[-*] (.*)$/gm, "<li>$1</li>");
		  s = s.replace(/(<li>[\s\S]*?<\/li>)/g, (m) => m.includes("<ul>") ? m : `<ul>${m}</ul>`);
		  s = s.split(/\n{2,}/).map((block) => {
		    if (!block.trim()) return "";
		    if (block.startsWith("\0DPSCODE") || block.startsWith("<")) return block;
		    return `<p>${block.replace(/\n/g, "<br/>")}</p>`;
		  }).join("\n");
		  s = s.replace(/\u0000DPSCODE(\d+)\u0000/g, (_m, i) => `<pre class="dps-md-pre"><code>${codeBlocks[Number(i)] ?? ""}</code></pre>`);
		  return s;
		}
		function PublishView({ api, t }) {
		  const [plugins, setPlugins] = (0, import_react3.useState)(null);
		  const [target, setTarget] = (0, import_react3.useState)("github");
		  const [githubToken, setGithubToken] = (0, import_react3.useState)("");
		  const [npmToken, setNpmToken] = (0, import_react3.useState)("");
		  const [selected, setSelected] = (0, import_react3.useState)("");
		  const [description, setDescription] = (0, import_react3.useState)("");
		  const [visibility, setVisibility] = (0, import_react3.useState)("public");
		  const [topics, setTopics] = (0, import_react3.useState)(["dsh-plugin"]);
		  const [descMode, setDescMode] = (0, import_react3.useState)("edit");
		  const [writeReadme, setWriteReadme] = (0, import_react3.useState)(true);
		  const [busy, setBusy] = (0, import_react3.useState)(false);
		  const [error51, setError] = (0, import_react3.useState)(null);
		  const [result, setResult] = (0, import_react3.useState)(null);
		  const [progress, setProgress] = (0, import_react3.useState)(null);
		  const load = (0, import_react3.useCallback)(async () => {
		    try {
		      const list = await api.myPlugins();
		      setPlugins(list);
		      if (list.length > 0 && !selected) {
		        setSelected(list[0].packageName);
		        setDescription(list[0].description ?? "");
		      }
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    }
		  }, [api, selected]);
		  (0, import_react3.useEffect)(() => {
		    void load();
		  }, [load]);
		  const onSelect = (name) => {
		    setSelected(name);
		    const p = plugins?.find((x) => x.packageName === name);
		    if (p) setDescription(p.description ?? "");
		  };
		  const toggleTopic = (topic) => {
		    setTopics((prev) => prev.includes(topic) ? prev.filter((x) => x !== topic) : [...prev, topic]);
		  };
		  const doPublish = async () => {
		    if (!selected) {
		      setError(t("publish.errNoPlugin"));
		      return;
		    }
		    setBusy(true);
		    setError(null);
		    setResult(null);
		    setProgress({ phase: t("publish.starting"), percent: 0, detail: "" });
		    const poll = window.setInterval(() => {
		      void api.publishProgress(selected).then((p) => {
		        if (p) setProgress(p);
		      }).catch(() => void 0);
		    }, 600);
		    try {
		      const r = await api.publish(
		        {
		          packageName: selected,
		          target,
		          githubToken: githubToken.trim() || void 0,
		          npmToken: npmToken.trim() || void 0,
		          visibility,
		          description,
		          topics,
		          writeReadme
		        },
		        getActor()
		      );
		      setResult(r);
		      setProgress(null);
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      window.clearInterval(poll);
		      setGithubToken("");
		      setNpmToken("");
		      setBusy(false);
		    }
		  };
		  const needGithub = target === "github" || target === "both";
		  const needNpm = target === "npm" || target === "both";
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view dps-publish", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-scaffold-hero", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-scaffold-hero-icon", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconCodeOutline16, { size: 26 }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "dps-scaffold-title", children: t("publish.title") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-scaffold-desc", children: t("publish.desc") })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-publish-grid", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("publish.stepTarget") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-chips", role: "group", children: ["github", "npm", "both"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: `dps-chip${target === k ? " active" : ""}`, onClick: () => setTarget(k), children: t(`publish.target.${k}`) }, k)) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("publish.stepKeys") }),
		        needGithub && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-row", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "input",
		          {
		            className: "dps-input",
		            type: "password",
		            value: githubToken,
		            placeholder: t("publish.ghTokenPlaceholder"),
		            onChange: (e) => setGithubToken(e.target.value),
		            autoComplete: "off"
		          }
		        ) }),
		        needNpm && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-row", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "input",
		          {
		            className: "dps-input",
		            type: "password",
		            value: npmToken,
		            placeholder: t("publish.npmTokenPlaceholder"),
		            onChange: (e) => setNpmToken(e.target.value),
		            autoComplete: "off"
		          }
		        ) }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-hint", children: t("publish.keysHint") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("publish.stepPlugin") }),
		        plugins === null ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: t("publish.loading") }) : plugins.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("publish.noOwn") }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("select", { className: "dps-select", value: selected, onChange: (e) => onSelect(e.target.value), children: plugins.map((p) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("option", { value: p.packageName, children: [
		            p.pkgName,
		            "@",
		            p.version ?? "?",
		            p.published ? `  \u{1F4E6}${t("publish.published")}` : "",
		            " \u2014 ",
		            p.localPath ?? ""
		          ] }, p.packageName)) }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-hint", title: selected, children: selected ? `\u{1F4C1} ${plugins.find((p) => p.packageName === selected)?.localPath ?? ""}` : "" })
		        ] })
		      ] }),
		      selected && plugins && plugins.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("publish.stepInfo") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-md-tabs", role: "tablist", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", role: "tab", "aria-selected": descMode === "edit", className: `dps-md-tab${descMode === "edit" ? " on" : ""}`, onClick: () => setDescMode("edit"), children: t("publish.mdEdit") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", role: "tab", "aria-selected": descMode === "preview", className: `dps-md-tab${descMode === "preview" ? " on" : ""}`, onClick: () => setDescMode("preview"), children: t("publish.mdPreview") })
		        ] }),
		        descMode === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "textarea",
		          {
		            className: "dps-input dps-input-area",
		            rows: 9,
		            value: description,
		            placeholder: t("publish.descPlaceholder"),
		            onChange: (e) => setDescription(e.target.value)
		          }
		        ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-md-preview", dangerouslySetInnerHTML: { __html: renderMarkdown(description || t("publish.mdEmpty")) } }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-hint", children: t("publish.mdHint") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "dps-check", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "checkbox", checked: writeReadme, onChange: (e) => setWriteReadme(e.target.checked) }),
		          t("publish.writeReadme")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-row", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-inline-label", children: t("publish.visibility") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: `dps-chip${visibility === "public" ? " active" : ""}`, onClick: () => setVisibility("public"), children: t("publish.public") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: `dps-chip${visibility === "private" ? " active" : ""}`, onClick: () => setVisibility("private"), children: t("publish.private") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: t("publish.visibilityHint") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-row", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-inline-label", children: t("publish.topics") }),
		          PUBLISH_TOPIC_PRESETS.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: `dps-chip${topics.includes(topic) ? " active" : ""}`, onClick: () => toggleTopic(topic), children: topic }, topic))
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-row", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: busy || !selected, onClick: () => void doPublish(), children: busy ? t("publish.publishing") : t("publish.submit") }),
		          result?.ok && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-notice dps-notice-ok", children: [
		            result.repoUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: result.repoUrl, target: "_blank", rel: "noreferrer", children: "GitHub \u2197" }),
		            result.repoUrl && result.npmUrl && "  ",
		            result.npmUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: result.npmUrl, target: "_blank", rel: "noreferrer", children: "npm \u2197" })
		          ] })
		        ] }),
		        busy && progress && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-install-progress", role: "progressbar", "aria-valuenow": progress.percent ?? void 0, style: { marginTop: 10 }, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-install-progress-head", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-install-progress-label", children: progress.percent == null ? progress.phase : `${progress.phase} ${progress.percent}%` }),
		            progress.detail && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", title: progress.detail, children: progress.detail })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-install-progress-track", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		            "div",
		            {
		              className: `dps-install-progress-bar${progress.percent == null ? " indeterminate" : ""}`,
		              style: progress.percent != null ? { width: `${progress.percent}%` } : void 0
		            }
		          ) })
		        ] }),
		        result && !result.ok && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-publish-result-fail", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: result.message }),
		          result.security && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-security-blocked", children: result.security.findings.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-security-item", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-security-sev", children: [
		              "\u{1F6AB} ",
		              f.severity === "critical" ? "\u9AD8\u98CE\u9669" : "\u8B66\u544A"
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { children: f.rule }),
		            " ",
		            f.target,
		            ": ",
		            f.detail
		          ] }, i)) }),
		          !result.security && result.detail && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("pre", { className: "dps-error-detail", children: result.detail })
		        ] }),
		        result && result.ok && result.security?.level === "warning" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-security-warning", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("publish.secWarningTitle") }),
		          result.security.findings.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-security-item", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-security-sev", children: [
		              "\u26A0\uFE0F ",
		              f.severity === "critical" ? "\u9AD8\u98CE\u9669" : "\u8B66\u544A"
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { children: f.rule }),
		            " ",
		            f.target,
		            ": ",
		            f.detail
		          ] }, i))
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null), t })
		      ] })
		    ] })
		  ] });
		}
		var HEALTH_META = {
		  healthy: { label: "\u5065\u5EB7", color: "#2e9e5b" },
		  attention: { label: "\u9700\u5173\u6CE8", color: "#d18a2a" },
		  stale: { label: "\u5DF2\u505C\u6EDE", color: "#d64545" }
		};
		function TrendChart({ series, t }) {
		  const W = 660;
		  const H = 210;
		  const PAD2 = { l: 52, r: 14, t: 18, b: 24 };
		  const dragRef = (0, import_react3.useRef)(null);
		  const [view, setView] = (0, import_react3.useState)(null);
		  const [dragging, setDragging] = (0, import_react3.useState)(false);
		  const all = series.flatMap((s) => s.points.map((p) => ({ date: p.date, count: p.count })));
		  if (all.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("health.noData") }) });
		  const tsList = all.map((p) => Date.parse(p.date)).filter((n) => !Number.isNaN(n));
		  const minTs = Math.min(...tsList);
		  const maxTs = Math.max(...tsList, Date.now());
		  const range = Math.max(maxTs - minTs, 864e5);
		  const v = view ?? { start: minTs - range * 0.03, end: maxTs + range * 0.02 };
		  const span = Math.max(v.end - v.start, 864e5);
		  const x = (ts) => PAD2.l + (ts - v.start) / span * (W - PAD2.l - PAD2.r);
		  const maxC = Math.max(1, ...all.map((p) => p.count));
		  const y = (c) => PAD2.t + (H - PAD2.t - PAD2.b) * (1 - c / maxC);
		  const zoom = (clientX, factor) => {
		    const ratio = Math.min(1, Math.max(0, (clientX - PAD2.l) / (W - PAD2.l - PAD2.r)));
		    const tsAt = v.start + ratio * span;
		    const newSpan = span * factor;
		    setView({ start: tsAt - ratio * newSpan, end: tsAt + (1 - ratio) * newSpan });
		  };
		  const onDown = (e) => {
		    dragRef.current = { x0: e.clientX, start0: v.start, end0: v.end };
		    setDragging(true);
		  };
		  const onMove = (e) => {
		    if (!dragRef.current || !dragging) return;
		    const dts = (e.clientX - dragRef.current.x0) / (W - PAD2.l - PAD2.r) * (dragRef.current.end0 - dragRef.current.start0);
		    setView({ start: dragRef.current.start0 - dts, end: dragRef.current.end0 - dts });
		  };
		  const onUp = () => {
		    dragRef.current = null;
		    setDragging(false);
		  };
		  const day = 864e5;
		  const ticks = [];
		  for (let ts = Math.ceil(v.start / day) * day; ts <= v.end; ts += day) {
		    const d = new Date(ts);
		    if (d.getDate() === 1 || d.getDate() === 15 || ticks.length === 0) ticks.push({ ts, label: `${d.getMonth() + 1}/${d.getDate()}` });
		    if (ticks.length > 12) break;
		  }
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
		    "svg",
		    {
		      className: "dps-h-timeline",
		      viewBox: `0 0 ${W} ${H}`,
		      role: "img",
		      "aria-label": "\u66F4\u65B0\u53D8\u52A8\u8D8B\u52BF",
		      style: { cursor: dragging ? "grabbing" : "grab", touchAction: "none" },
		      onWheel: (e) => {
		        e.preventDefault();
		        zoom(e.clientX, e.deltaY > 0 ? 1.25 : 0.8);
		      },
		      onMouseDown: onDown,
		      onMouseMove: onMove,
		      onMouseUp: onUp,
		      onMouseLeave: onUp,
		      children: [
		        ticks.map((tk, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: x(tk.ts), y1: PAD2.t, x2: x(tk.ts), y2: H - PAD2.b, stroke: "var(--dsw-alias-border-l2)", strokeDasharray: "3 4" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("text", { x: x(tk.ts), y: H - 6, textAnchor: "middle", fontSize: "10", fill: "var(--dsw-alias-label-tertiary)", children: tk.label })
		        ] }, i)),
		        series.map((s) => {
		          const pts = s.points.map((p) => Date.parse(p.date)).filter((n) => !Number.isNaN(n));
		          if (pts.length === 0) return null;
		          const path = s.points.filter((p) => !Number.isNaN(Date.parse(p.date))).map((p, i) => `${i === 0 ? "M" : "L"}${x(Date.parse(p.date)).toFixed(1)},${y(p.count).toFixed(1)}`).join(" ");
		          return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: path, fill: "none", stroke: s.color, strokeWidth: "1.8", opacity: "0.9" }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: path, fill: "none", stroke: s.color, strokeWidth: "7", opacity: "0.07" })
		          ] }, s.key);
		        }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: PAD2.l, y1: PAD2.t, x2: PAD2.l, y2: H - PAD2.b, stroke: "var(--dsw-alias-border-l2)" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: PAD2.l, y1: H - PAD2.b, x2: W - PAD2.r, y2: H - PAD2.b, stroke: "var(--dsw-alias-border-l2)" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("text", { x: 6, y: PAD2.t + 10, fontSize: "9", fill: "var(--dsw-alias-label-tertiary)", children: maxC }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { transform: `translate(${PAD2.l + 4}, ${PAD2.t - 2})`, children: series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: `translate(${i * 150}, 0)`, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: 0, y1: -2, x2: 18, y2: -2, stroke: s.color, strokeWidth: "2.5" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("text", { x: 24, y: 3, fontSize: "10", fill: "var(--dsw-alias-label-secondary)", children: s.label })
		        ] }, s.key)) })
		      ]
		    }
		  );
		}
		function HealthTimeline({ timeline, trend, t }) {
		  const W = 660;
		  const H = 240;
		  const PAD2 = { l: 52, r: 14, t: 22, b: 26 };
		  const dragRef = (0, import_react3.useRef)(null);
		  const [view, setView] = (0, import_react3.useState)(null);
		  const [dragging, setDragging] = (0, import_react3.useState)(false);
		  const points = [
		    ...timeline.filter((v2) => v2.publishedAt).map((v2) => Date.parse(v2.publishedAt)),
		    ...trend.map((d) => Date.parse(d.date))
		  ].filter((n) => !Number.isNaN(n));
		  if (points.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("health.noData") }) });
		  const minTs = Math.min(...points);
		  const maxTs = Math.max(...points, Date.now());
		  const range = Math.max(maxTs - minTs, 864e5);
		  const v = view ?? { start: minTs - range * 0.03, end: maxTs + range * 0.02 };
		  const span = Math.max(v.end - v.start, 864e5);
		  const x = (ts) => PAD2.l + (ts - v.start) / span * (W - PAD2.l - PAD2.r);
		  const maxDl = Math.max(1, ...trend.map((d) => d.downloads));
		  const y = (dl) => PAD2.t + (H - PAD2.t - PAD2.b) * (1 - dl / maxDl);
		  const zoom = (clientX, factor) => {
		    const rect = dragRef.current && dragRef.current.rect;
		    const ratio = Math.min(1, Math.max(0, (clientX - PAD2.l) / (W - PAD2.l - PAD2.r)));
		    const tsAt = v.start + ratio * span;
		    const newSpan = span * factor;
		    setView({ start: tsAt - ratio * newSpan, end: tsAt + (1 - ratio) * newSpan });
		    void rect;
		  };
		  const onWheel = (e) => {
		    e.preventDefault();
		    zoom(e.clientX, e.deltaY > 0 ? 1.25 : 0.8);
		  };
		  const onDown = (e) => {
		    dragRef.current = { x0: e.clientX, start0: v.start, end0: v.end };
		    setDragging(true);
		  };
		  const onMove = (e) => {
		    if (!dragRef.current || !dragging) return;
		    const dx = e.clientX - dragRef.current.x0;
		    const dts = dx / (W - PAD2.l - PAD2.r) * (dragRef.current.end0 - dragRef.current.start0);
		    setView({ start: dragRef.current.start0 - dts, end: dragRef.current.end0 - dts });
		  };
		  const onUp = () => {
		    dragRef.current = null;
		    setDragging(false);
		  };
		  const ticks = [];
		  const day = 864e5;
		  for (let ts = Math.ceil(v.start / day) * day; ts <= v.end; ts += day) {
		    const d = new Date(ts);
		    if (d.getDate() === 1 || d.getDate() === 15 || ticks.length === 0) {
		      ticks.push({ ts, label: `${d.getMonth() + 1}/${d.getDate()}` });
		    }
		    if (ticks.length > 12) break;
		  }
		  const trendPath = trend.length > 1 ? trend.map((d, i) => `${i === 0 ? "M" : "L"}${x(Date.parse(d.date)).toFixed(1)},${y(d.downloads).toFixed(1)}`).join(" ") : "";
		  const rel = (v0) => v0 === v0 ? v0 : v0;
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
		    "svg",
		    {
		      className: "dps-h-timeline",
		      viewBox: `0 0 ${W} ${H}`,
		      role: "img",
		      "aria-label": "\u63D2\u4EF6\u52A8\u6001\u65F6\u95F4\u8F74",
		      style: { cursor: dragging ? "grabbing" : "grab", touchAction: "none" },
		      onWheel,
		      onMouseDown: onDown,
		      onMouseMove: onMove,
		      onMouseUp: onUp,
		      onMouseLeave: onUp,
		      children: [
		        ticks.map((tk, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: x(tk.ts), y1: PAD2.t, x2: x(tk.ts), y2: H - PAD2.b, stroke: "var(--dsw-alias-border-l2)", strokeDasharray: "3 4" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("text", { x: x(tk.ts), y: H - 8, textAnchor: "middle", fontSize: "10", fill: "var(--dsw-alias-label-tertiary)", children: tk.label })
		        ] }, i)),
		        trendPath && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: trendPath, fill: "none", stroke: "#378ADD", strokeWidth: "1.6", opacity: "0.85" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: `${trendPath}`, fill: "none", stroke: "#378ADD", strokeWidth: "6", opacity: "0.08" })
		        ] }),
		        timeline.filter((v2) => v2.publishedAt).slice(-40).map((rel2, i) => {
		          const ts = Date.parse(rel2.publishedAt);
		          if (Number.isNaN(ts) || ts < v.start || ts > v.end) return null;
		          const px = x(ts);
		          const showLabel = i % Math.max(1, Math.floor(timeline.length / 8)) === 0;
		          return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: px, y1: PAD2.t, x2: px, y2: H - PAD2.b, stroke: "#e0a020", strokeWidth: "1", opacity: "0.5" }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: px, cy: y(maxDl) - 6, r: "3.2", fill: "#e0a020" }),
		            showLabel && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("text", { x: px, y: PAD2.t - 6, textAnchor: "middle", fontSize: "9", fill: "var(--dsw-alias-label-secondary)", children: rel2.version })
		          ] }, rel2.version + i);
		        }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("text", { x: 6, y: PAD2.t + 10, fontSize: "9", fill: "var(--dsw-alias-label-tertiary)", children: t("health.axisDownloads") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("text", { x: 6, y: H - PAD2.b - 8, fontSize: "9", fill: "var(--dsw-alias-label-tertiary)", children: "0" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: PAD2.l, y1: PAD2.t, x2: PAD2.l, y2: H - PAD2.b, stroke: "var(--dsw-alias-border-l2)" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: PAD2.l, y1: H - PAD2.b, x2: W - PAD2.r, y2: H - PAD2.b, stroke: "var(--dsw-alias-border-l2)" })
		      ]
		    }
		  );
		}
		function HealthHub({ api, t }) {
		  const [list, setList] = (0, import_react3.useState)(null);
		  const [error51, setError] = (0, import_react3.useState)(null);
		  const [selected, setSelected] = (0, import_react3.useState)(null);
		  const [detail, setDetail] = (0, import_react3.useState)(null);
		  const load = (0, import_react3.useCallback)(async () => {
		    setList(null);
		    try {
		      setList(await api.healthHub());
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    }
		  }, [api]);
		  (0, import_react3.useEffect)(() => {
		    void load();
		  }, [load]);
		  const openDetail = async (name) => {
		    setSelected(name);
		    setDetail(null);
		    try {
		      setDetail(await api.healthDetail(name));
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    }
		  };
		  if (selected && detail) {
		    const bd = detail.breakdown;
		    const parts = [
		      [t("health.act"), bd.activity, 30],
		      [t("health.dist"), bd.distribution, 15],
		      [t("health.bugs"), bd.bugs, 25],
		      [t("health.comm"), bd.community, 20],
		      [t("health.rel"), bd.releases, 10]
		    ];
		    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-detail-head", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn dps-back", onClick: () => {
		          setSelected(null);
		          setDetail(null);
		        }, "aria-label": "\u8FD4\u56DE", children: "\u2190" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "dps-h-title", children: detail.name }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-sub", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-h-score-text", children: [
		              t("health.title"),
		              " ",
		              detail.health,
		              " / 100"
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
		              "@",
		              detail.developer
		            ] })
		          ] })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metrics", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("health.lastUpdate") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: detail.lastUpdate ? formatDate(detail.lastUpdate) : "\u2014" })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("health.downloads") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: formatCount(detail.downloads) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: "\u2605 stars" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: detail.stars })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-metric", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-metric-label", children: t("health.openIssues") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: detail.openIssues ?? "\u2014" })
		        ] }),
		        detail.repoFullName && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "dps-h-metric dps-h-repo", href: `https://github.com/${detail.repoFullName}`, target: "_blank", rel: "noreferrer", children: "GitHub \u2197" })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("health.breakdown") }),
		        parts.map(([label, score, max]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-bar-row", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-h-bar-label", children: label }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-bar-track", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `dps-h-bar-fill lv-${detail.level}`, style: { width: `${score / max * 100}%` } }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-h-bar-val", children: [
		            score,
		            "/",
		            max
		          ] })
		        ] }, label))
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("health.timeline") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-hint", children: t("health.timelineHint") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HealthTimeline, { timeline: detail.timeline, trend: detail.downloadTrend, t })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null), t })
		    ] });
		  }
		  const items = list?.items ?? [];
		  const updatedAt = list?.updatedAt ?? null;
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-scaffold-hero", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-scaffold-hero-icon", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconWarningOutline16, { size: 26 }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "dps-scaffold-title", children: t("health.title") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "dps-scaffold-desc", children: [
		          t("health.desc"),
		          updatedAt ? ` ${t("health.updatedAt")} ${formatDate(updatedAt)}` : ""
		        ] })
		      ] })
		    ] }),
		    list === null && !error51 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: t("health.loading") }) : error51 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null), t }) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("health.empty") }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-rank-list", children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-rank-row", role: "button", tabIndex: 0, onClick: () => void openDetail(p.packageName), onKeyDown: (e) => {
		      if (e.key === "Enter") void openDetail(p.packageName);
		    }, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-rank-num${p.rank <= 3 ? ` top${p.rank}` : ""}`, children: p.rank }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-rank-main", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-rank-name", children: [
		        p.name,
		        " ",
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		          "@",
		          p.developer
		        ] })
		      ] }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-rank-score", children: [
		        p.health,
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: "/100" })
		      ] })
		    ] }, p.packageName)) })
		  ] });
		}
		function WikiExplorer({ api, onOpen, t }) {
		  const [list, setList] = (0, import_react3.useState)(null);
		  const [query, setQuery] = (0, import_react3.useState)("");
		  const [category2, setCategory] = (0, import_react3.useState)("");
		  const [source, setSource] = (0, import_react3.useState)("");
		  const [error51, setError] = (0, import_react3.useState)(null);
		  const load = (0, import_react3.useCallback)(async () => {
		    setList(null);
		    try {
		      setList(await api.wikiHub({ query, category: category2, source, limit: 300 }));
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    }
		  }, [api, query, category2, source]);
		  (0, import_react3.useEffect)(() => {
		    void load();
		  }, [load]);
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-scaffold-hero", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-scaffold-hero-icon", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconWarningOutline16, { size: 26 }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "dps-scaffold-title", children: t("wiki.title") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-scaffold-desc", children: t("wiki.desc") })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-wiki-toolbar", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        "input",
		        {
		          className: "dps-input",
		          style: { maxWidth: 260 },
		          value: query,
		          placeholder: t("wiki.search"),
		          onChange: (e) => setQuery(e.target.value)
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { className: "dps-select", value: category2, onChange: (e) => setCategory(e.target.value), children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "", children: t("wiki.allCat") }),
		        CATEGORY_META.filter((c) => c.key !== "all").map((c) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: c.key, children: t(c.labelKey) }, c.key))
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { className: "dps-select", value: source, onChange: (e) => setSource(e.target.value), children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "", children: t("wiki.allSource") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "mirror", children: t("wiki.srcMirror") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "catalog", children: t("wiki.srcCatalog") })
		      ] })
		    ] }),
		    list === null && !error51 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: t("wiki.loading") }) : error51 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null), t }) : list && list.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("wiki.empty") }) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-muted-sm", style: { margin: "6px 0" }, children: [
		        t("wiki.total"),
		        " ",
		        list?.total
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-list", children: list?.items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-row", role: "button", tabIndex: 0, onClick: () => onOpen(p.packageName), onKeyDown: (e) => {
		        if (e.key === "Enter") onOpen(p.packageName);
		      }, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-row-main", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-row-name", children: [
		            p.name,
		            " ",
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              "@",
		              p.developer
		            ] }),
		            p.source === "catalog" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-badge dps-badge-github", title: t("wiki.srcCatalogHint"), children: t("wiki.srcCatalog") }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TrustBadge, { level: p.trustLevel, t })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-row-meta", children: p.shortDescription ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: p.shortDescription.slice(0, 90) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: t("wiki.catalogNoDesc") }) })
		        ] }),
		        p.health !== null && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-rank-score", children: p.health })
		      ] }, p.packageName)) })
		    ] })
		  ] });
		}
		function SkillStore({ api, t }) {
		  const [list, setList] = (0, import_react3.useState)(null);
		  const [query, setQuery] = (0, import_react3.useState)("");
		  const [debounced, setDebounced] = (0, import_react3.useState)("");
		  const [category2, setCategory] = (0, import_react3.useState)("all");
		  const [platform, setPlatform] = (0, import_react3.useState)("all");
		  const [selected, setSelected] = (0, import_react3.useState)(null);
		  const [busy, setBusy] = (0, import_react3.useState)(null);
		  const [error51, setError] = (0, import_react3.useState)(null);
		  const [copied, setCopied] = (0, import_react3.useState)(null);
		  (0, import_react3.useEffect)(() => {
		    const id = window.setTimeout(() => setDebounced(query), 250);
		    return () => window.clearTimeout(id);
		  }, [query]);
		  const load = (0, import_react3.useCallback)(async () => {
		    try {
		      const r = await api.skillList({ query: debounced || null, category: category2 === "all" ? null : category2, platform: platform === "all" ? null : platform });
		      setList(r);
		      setError(null);
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    }
		  }, [api, debounced, category2, platform]);
		  (0, import_react3.useEffect)(() => {
		    void load();
		  }, [load]);
		  const openDetail = async (id) => {
		    try {
		      setSelected(await api.skillDetail(id));
		      setError(null);
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    }
		  };
		  const doInstall = async (id) => {
		    setBusy(id);
		    try {
		      const r = await api.skillInstall(id, getActor());
		      if (!r.ok) setError(r.message);
		      void load();
		      if (selected) setSelected(await api.skillDetail(id));
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const doUninstall = async (name) => {
		    setBusy(name);
		    try {
		      const r = await api.skillUninstall(name, getActor());
		      if (!r.ok) setError(r.message);
		      void load();
		      if (selected) setSelected(await api.skillDetail(selected.id));
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const copy = async (s) => {
		    try {
		      await navigator.clipboard.writeText(s);
		      setCopied(s);
		      window.setTimeout(() => setCopied(null), 1500);
		    } catch {
		    }
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-scaffold-hero", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-scaffold-hero-icon", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconCordisPluginOutline14, { size: 26 }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "dps-scaffold-title", children: t("skill.title") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-scaffold-desc", children: t("skill.desc") })
		      ] })
		    ] }),
		    selected ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { type: "button", className: "dps-btn dps-btn-back", onClick: () => setSelected(null), children: [
		        "\u2190 ",
		        t("skill.back")
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-wiki-head", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-wiki-name", children: [
		            selected.name,
		            selected.version && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              " v",
		              selected.version
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              " @",
		              selected.author
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-badge dps-badge-${selected.platform === "dsh" ? "update" : "unreviewed"}`, children: selected.platform === "dsh" ? t("skill.platformDsh") : t("skill.platformGeneral") }),
		            selected.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-badge dps-badge-${c}`, children: t(`category.${c}`) ?? CATEGORY_LABEL[c] ?? c }, c))
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-wiki-desc", children: selected.descriptionZh || selected.description || "\u2014" })
		        ] }),
		        selected.installed ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-danger", disabled: busy !== null, onClick: () => void doUninstall(selected.name), children: busy === selected.name ? t("action.processing") : t("skill.uninstall") }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: busy !== null, onClick: () => void doInstall(selected.id), children: busy === selected.id ? t("action.processing") : t("skill.install") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-security-warning", style: { marginBottom: 12 }, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("skill.howToUse") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-cmd", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { className: "dps-cmd-code", children: t("skill.howToUseCmd") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn", onClick: () => copy(t("skill.howToUseCmd")), "aria-label": t("scaffold.copyAria"), title: t("scaffold.copy"), children: copied === t("skill.howToUseCmd") ? "\u2713" : t("scaffold.copy") })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-wiki-facts", style: { marginBottom: 10 }, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		          t("skill.source"),
		          " ",
		          selected.repoFullName
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		          t("skill.path"),
		          " ",
		          selected.skillPath || "SKILL.md"
		        ] }),
		        selected.installedDir && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-dot", children: "\xB7" }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: selected.installedDir })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-section", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h4", { className: "dps-section-title", children: t("skill.content") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-wiki-markdown dps-skill-content", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Markdown, { text: selected.content }) })
		      ] })
		    ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-toolbar", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { className: "dps-input dps-search", value: query, onChange: (e) => setQuery(e.target.value), placeholder: t("skill.searchPlaceholder") }),
		        list && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		          t("skill.total"),
		          " ",
		          list.total
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-filter-row", children: [
		        CATEGORY_META.map((c) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: `dps-chip${category2 === c.key ? " active" : ""}`, onClick: () => setCategory(c.key), children: t(c.labelKey) }, c.key)),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-filter-sep" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: `dps-chip${platform === "all" ? " active" : ""}`, onClick: () => setPlatform("all"), children: t("skill.platformAll") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: `dps-chip${platform === "dsh" ? " active" : ""}`, onClick: () => setPlatform("dsh"), children: t("skill.platformDsh") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: `dps-chip${platform === "general" ? " active" : ""}`, onClick: () => setPlatform("general"), children: t("skill.platformGeneral") })
		      ] }),
		      list === null && !error51 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-empty", children: t("skill.loading") }) : error51 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ErrorBanner, { error: error51, onDismiss: () => setError(null), t }) : list && list.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-empty", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("skill.empty") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-muted-sm", children: t("skill.emptyHint") })
		      ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-list", children: list?.items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-row", role: "button", tabIndex: 0, onClick: () => void openDetail(s.id), onKeyDown: (e) => {
		        if (e.key === "Enter") void openDetail(s.id);
		      }, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-row-main", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-h-row-name", children: [
		            s.name,
		            s.version && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              " v",
		              s.version
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dps-muted-sm", children: [
		              " @",
		              s.author
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-badge dps-badge-${s.platform === "dsh" ? "update" : "unreviewed"}`, children: s.platform === "dsh" ? t("skill.platformDsh") : t("skill.platformGeneral") }),
		            s.installed && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-badge dps-badge-npm", children: t("skill.installed") })
		          ] }),
		          s.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-h-row-meta", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dps-muted-sm", children: s.description.slice(0, 110) }) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		          "button",
		          {
		            type: "button",
		            className: `dps-btn${s.installed ? " dps-btn-danger" : " dps-btn-primary"}`,
		            disabled: busy !== null,
		            onClick: (e) => {
		              e.stopPropagation();
		              void (s.installed ? doUninstall(s.name) : doInstall(s.id));
		            },
		            children: busy === (s.installed ? s.name : s.id) ? t("action.processing") : s.installed ? t("skill.uninstall") : t("skill.install")
		          }
		        )
		      ] }, s.id)) })
		    ] })
		  ] });
		}
		function Scaffold({ api, t }) {
		  const [info, setInfo] = (0, import_react3.useState)(null);
		  const [copied, setCopied] = (0, import_react3.useState)(null);
		  (0, import_react3.useEffect)(() => {
		    void api.scaffold().then(setInfo).catch(() => void 0);
		  }, [api]);
		  const copy = (cmd) => {
		    void navigator.clipboard?.writeText(cmd).then(() => {
		      setCopied(cmd);
		      window.setTimeout(() => setCopied(null), 1500);
		    });
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-view", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-scaffold-hero", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-scaffold-hero-icon", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconCodeOutline16, { size: 26 }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "dps-scaffold-title", children: t("scaffold.title") }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-scaffold-desc", children: t("scaffold.desc") })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ol", { className: "dps-steps", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { className: "dps-step", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-step-num", children: "1" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-step-body", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-step-title", children: t("scaffold.step1.title") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "dps-step-text", children: [
		            t("scaffold.step1.before"),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { children: "dsh.bundle.patch" }),
		            t("scaffold.step1.mid"),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { children: 'dsh.client.platform: "web"' }),
		            t("scaffold.step1.after"),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "dps-md-link", href: "https://github.com/hrhgit/deepseek-harness-plugin-manager", target: "_blank", rel: "noreferrer", children: " dsh-plugin-manager" }),
		            t("scaffold.step1.sameAs"),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("a", { className: "dps-md-link", href: info?.docsUrl, target: "_blank", rel: "noreferrer", children: [
		              " ",
		              t("scaffold.step1.docs")
		            ] }),
		            t("scaffold.step1.tail")
		          ] })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { className: "dps-step", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-step-num", children: "2" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-step-body", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-step-title", children: t("scaffold.step2.title") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-step-text", children: t("scaffold.step2.text") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-cmd-list", children: (info?.commands ?? []).map((cmd) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-cmd", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { className: "dps-cmd-code", children: cmd }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dps-icon-btn", onClick: () => copy(cmd), "aria-label": t("scaffold.copyAria"), title: t("scaffold.copy"), children: copied === cmd ? "\u2713" : t("scaffold.copy") })
		          ] }, cmd)) })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("li", { className: "dps-step", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-step-num", children: "3" }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-step-body", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dps-step-title", children: t("scaffold.step3.title") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dps-step-text", children: t("scaffold.step3.text") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-scaffold-cats", children: [
		            t("scaffold.step3.cats"),
		            info?.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dps-badge dps-badge-${c}`, children: t(`category.${c}`) ?? CATEGORY_LABEL[c] ?? c }, c)),
		            t("scaffold.step3.catsHint")
		          ] })
		        ] })
		      ] })
		    ] }),
		    info && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dps-scaffold-links", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "dps-btn", href: info.templateUrl, target: "_blank", rel: "noreferrer", children: t("scaffold.linkRepo") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "dps-btn", href: info.docsUrl, target: "_blank", rel: "noreferrer", children: t("scaffold.linkDocs") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "dps-btn", href: "https://github.com/search?q=topic%3Adsh-plugin&type=repositories", target: "_blank", rel: "noreferrer", children: t("scaffold.linkEco") })
		    ] })
		  ] });
		}
		function StoreViewBody({ view, api, onOpen, onChanged, t }) {
		  switch (view) {
		    case "discover":
		      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Discover, { api, onOpen, onChanged, t });
		    case "wiki":
		      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(WikiExplorer, { api, onOpen, t });
		    case "skill":
		      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SkillStore, { api, t });
		    case "installed":
		      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Installed, { api, onOpen, t });
		    case "publish":
		      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PublishView, { api, t });
		    case "health":
		      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HealthHub, { api, t });
		    case "scaffold":
		      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Scaffold, { api, t });
		    case "audit":
		      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Audit, { api, t });
		    case "settings":
		      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Settings, { api, t });
		    default:
		      return null;
		  }
		}

		// src/client/StoreApp.tsx
		var import_jsx_runtime4 = require("react/jsx-runtime");
		var NAV_KEYS = [
		  { key: "discover", labelKey: "nav.discover", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconCordisPluginOutline14, { size: 16 }) },
		  { key: "wiki", labelKey: "nav.wiki", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconWarningOutline16, { size: 16 }) },
		  { key: "skill", labelKey: "nav.skill", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconCordisPluginOutline14, { size: 16 }) },
		  { key: "installed", labelKey: "nav.installed", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconRefreshOutline16, { size: 16 }) },
		  { key: "health", labelKey: "nav.health", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconWarningOutline16, { size: 16 }) },
		  { key: "publish", labelKey: "nav.publish", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconUserOutline16, { size: 16 }) },
		  { key: "scaffold", labelKey: "nav.scaffold", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconUserOutline16, { size: 16 }) },
		  { key: "audit", labelKey: "nav.audit", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconUserOutline16, { size: 16 }) },
		  { key: "settings", labelKey: "nav.settings", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconSettingsOutline16, { size: 16 }) }
		];
		function useSyncExternalStoreShim(store) {
		  const [value, setValue] = (0, import_react4.useState)(store.getSnapshot);
		  (0, import_react4.useEffect)(() => store.subscribe(() => setValue(store.getSnapshot())), [store]);
		  return value;
		}
		function StoreApp({ api, t }) {
		  const open = useSyncExternalStoreShim(openStoreStore);
		  const [view, setViewState] = (0, import_react4.useState)(() => viewStore.getSnapshot());
		  const [detailName, setDetailName] = (0, import_react4.useState)(null);
		  const [changedTick, setChangedTick] = (0, import_react4.useState)(0);
		  (0, import_react4.useEffect)(() => viewStore.subscribe(() => setViewState(viewStore.getSnapshot())), []);
		  (0, import_react4.useEffect)(() => {
		    const onNavigate = (e) => {
		      const name = e.detail;
		      if (name) setDetailName(name);
		    };
		    window.addEventListener("dps-navigate", onNavigate);
		    return () => window.removeEventListener("dps-navigate", onNavigate);
		  }, []);
		  (0, import_react4.useEffect)(() => {
		    if (!open) return;
		    const onKey = (e) => {
		      if (e.key === "Escape") closeStore();
		    };
		    window.addEventListener("keydown", onKey);
		    return () => window.removeEventListener("keydown", onKey);
		  }, [open]);
		  if (!open) return null;
		  const openDetail = (0, import_react4.useCallback)((name) => setDetailName(name), []);
		  const onChanged = (0, import_react4.useCallback)(() => setChangedTick((n) => n + 1), []);
		  const NAV = NAV_KEYS.map((n) => ({ ...n, label: t(n.labelKey) }));
		  return (0, import_react_dom.createPortal)(
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dps-overlay", role: "dialog", "aria-modal": "true", "aria-label": t("app.title"), children: [
		      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dps-mask", onClick: closeStore }),
		      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dps-panel", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dps-nav", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dps-nav-title", children: t("app.title") }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("nav", { className: "dps-nav-list", "aria-label": t("nav.discover"), children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
		            "button",
		            {
		              type: "button",
		              className: `dps-nav-cell${view === item.key && !detailName ? " active" : ""}`,
		              onClick: () => {
		                setViewState(item.key);
		                viewStore.set(item.key);
		                setDetailName(null);
		              },
		              children: [
		                item.icon,
		                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dps-nav-label", children: item.label })
		              ]
		            },
		            item.key
		          )) }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dps-nav-foot", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "dps-icon-btn", onClick: closeStore, "aria-label": t("app.close"), children: "\xD7" }) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dps-content", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dps-header", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dps-header-title", children: detailName ? t("app.detail") : NAV.find((n) => n.key === view)?.label }),
		            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dps-actions", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "dps-close", onClick: closeStore, "aria-label": t("app.close"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_dsh_client_ui_primitives2.IconCloseOutline16, { size: 16 }) }) })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dps-body", children: detailName ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		            Detail,
		            {
		              api,
		              packageName: detailName,
		              onBack: () => setDetailName(null),
		              onChanged,
		              t
		            },
		            `detail-${detailName}-${changedTick}`
		          ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(StoreViewBody, { view, api, onOpen: openDetail, onChanged, t }) })
		        ] })
		      ] })
		    ] }),
		    document.body
		  );
		}

		// src/client/settings-section.tsx
		var import_react5 = require("react");
		var import_dsh_client_ui_primitives3 = require("@deepseek-ai/dsh-client-ui-primitives");
		var import_jsx_runtime5 = require("react/jsx-runtime");
		function StoreSettingsSection({ api, openStore: openStore2 }) {
		  const [settings, setSettings] = (0, import_react5.useState)(null);
		  const [status, setStatus] = (0, import_react5.useState)(null);
		  const [token, setToken] = (0, import_react5.useState)("");
		  const [hours, setHours] = (0, import_react5.useState)("24");
		  const [actor, setActorName] = (0, import_react5.useState)(actorDisplay());
		  const [error51, setError] = (0, import_react5.useState)(null);
		  const [notice, setNotice] = (0, import_react5.useState)(null);
		  const [busy, setBusy] = (0, import_react5.useState)(null);
		  const refresh = (0, import_react5.useCallback)(async () => {
		    try {
		      const [s, st] = await Promise.all([api.settings(), api.syncStatus()]);
		      setSettings(s);
		      setStatus(st);
		      setHours(String(st.scheduleHours));
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    }
		  }, [api]);
		  (0, import_react5.useEffect)(() => {
		    void refresh();
		  }, [refresh]);
		  (0, import_react5.useEffect)(() => {
		    if (status?.state !== "syncing") return;
		    const id = window.setInterval(() => {
		      void refresh();
		    }, 1500);
		    return () => window.clearInterval(id);
		  }, [status?.state, refresh]);
		  const saveToken = async () => {
		    setBusy("token");
		    setNotice(null);
		    try {
		      const r = await api.setGithubToken(token, getActor());
		      if (r.ok) {
		        setToken("");
		        setNotice(r.message);
		        await refresh();
		      } else setError(r.message);
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const clearToken = async () => {
		    setBusy("token");
		    try {
		      const r = await api.clearGithubToken(getActor());
		      setNotice(r.ok ? r.message : null);
		      setError(r.ok ? null : r.message);
		      await refresh();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const saveSchedule = async () => {
		    setBusy("schedule");
		    try {
		      const r = await api.setSchedule(Number(hours), getActor());
		      setNotice(r.ok ? r.message : null);
		      setError(r.ok ? null : r.message);
		      await refresh();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const syncNow = async () => {
		    setBusy("sync");
		    setNotice(null);
		    try {
		      const r = await api.syncNow();
		      setError(r.ok ? null : r.message);
		      setNotice(r.ok ? r.message : null);
		      await refresh();
		    } catch (e) {
		      setError(e instanceof Error ? e.message : String(e));
		    } finally {
		      setBusy(null);
		    }
		  };
		  const saveActor = () => {
		    setActor(actor);
		    setNotice("\u663E\u793A\u540D\u5DF2\u4FDD\u5B58\uFF0C\u540E\u7EED\u64CD\u4F5C\u5C06\u4EE5\u8BE5\u540D\u79F0\u8BB0\u5F55\u5230\u5BA1\u8BA1\u65E5\u5FD7\u3002");
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dps-settings-native", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dps-native-hero", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_dsh_client_ui_primitives3.IconCordisPluginOutline14, { size: 18 }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "\u63D2\u4EF6\u5546\u5E97\u8BBE\u7F6E" }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dps-btn dps-btn-sm dps-btn-primary", onClick: openStore2, children: "\u6253\u5F00\u63D2\u4EF6\u5546\u5E97" })
		    ] }),
		    error51 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dps-error", role: "alert", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_dsh_client_ui_primitives3.IconWarningOutline16, { size: 16 }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dps-error-text", children: error51 }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dps-icon-btn", onClick: () => setError(null), "aria-label": "\u5173\u95ED", children: "\xD7" })
		    ] }),
		    notice && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dps-notice", children: notice }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dps-section", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h4", { className: "dps-section-title", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_dsh_client_ui_primitives3.IconUserOutline16, { size: 15 }),
		        " \u64CD\u4F5C\u8005\u8EAB\u4EFD\uFF08\u5BA1\u8BA1\u65E5\u5FD7\u7528\uFF09"
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dps-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { className: "dps-input", value: actor, placeholder: "\u4F8B\u5982\uFF1A\u5F20\u4E09 / zhangsan", maxLength: 64, onChange: (e) => setActorName(e.target.value) }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dps-btn", onClick: saveActor, children: "\u4FDD\u5B58\u663E\u793A\u540D" })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "dps-hint", children: "\u5B89\u88C5\u3001\u5378\u8F7D\u3001\u542F\u7528\u3001\u7981\u7528\u3001\u8BC4\u5206\u7B49\u64CD\u4F5C\u4F1A\u4EE5\u8BE5\u540D\u79F0\u8BB0\u5F55\u5230\u5BA1\u8BA1\u65E5\u5FD7\uFF0C\u6EE1\u8DB3\u4F01\u4E1A\u5408\u89C4\u8FFD\u6EAF\u8981\u6C42\u3002" })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dps-section", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h4", { className: "dps-section-title", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_dsh_client_ui_primitives3.IconSettingsOutline16, { size: 15 }),
		        " GitHub \u79C1\u4EBA Token"
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "dps-hint", children: [
		        "GitHub API \u533F\u540D\u9650\u9891\u8F83\u4F4E\uFF08\u641C\u7D22 10 \u6B21/\u5206\u949F\u3001\u6838\u5FC3 60 \u6B21/\u5C0F\u65F6\uFF09\u3002\u914D\u7F6E\u79C1\u4EBA Token\uFF08",
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("code", { children: "ghp_\u2026" }),
		        "\uFF0Cpublic_repo \u8BFB\u53D6\u6743\u9650\uFF09\u540E\u9650\u9891\u5927\u5E45\u63D0\u5347\uFF0C \u955C\u50CF\u540C\u6B65\u53EF\u5B8C\u6574\u62C9\u53D6\u7248\u672C\u5386\u53F2\u3002Token \u4EC5\u4FDD\u5B58\u5728\u672C\u673A\u6570\u636E\u5E93\u3002"
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dps-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { className: "dps-input", type: "password", value: token, placeholder: settings?.tokenConfigured ? `\u5DF2\u914D\u7F6E\uFF1A${settings.tokenMasked}` : "\u7C98\u8D34 GitHub \u79C1\u4EBA Token\uFF08ghp_\u2026\uFF09", onChange: (e) => setToken(e.target.value), autoComplete: "off" }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: busy === "token" || !token.trim(), onClick: () => void saveToken(), children: "\u4FDD\u5B58" }),
		        settings?.tokenConfigured && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dps-btn", disabled: busy === "token", onClick: () => void clearToken(), children: "\u6E05\u9664" })
		      ] }),
		      settings && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "dps-hint", children: [
		        "\u5F53\u524D\u6838\u5FC3\u989D\u5EA6\uFF1A",
		        settings.rateLimitRemaining === null ? "\u672A\u67E5\u8BE2" : `\u5269\u4F59 ${settings.rateLimitRemaining} \u6B21`,
		        " \xB7 \u955C\u50CF\u63D2\u4EF6\uFF1A",
		        settings.pluginCount,
		        " \u4E2A \xB7 \u6570\u636E\u5E93\uFF1A",
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("code", { children: settings.dbPath })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dps-section", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h4", { className: "dps-section-title", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_dsh_client_ui_primitives3.IconRefreshOutline16, { size: 15 }),
		        " \u955C\u50CF\u540C\u6B65\uFF08\u672C\u5730\u6570\u636E\u5E93\u7F13\u5B58\uFF09"
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "dps-hint", children: [
		        "\u5B9A\u671F\u5C06 GitHub \u4E0A\u6807\u8BB0 ",
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("code", { children: "topic:dsh-plugin" }),
		        " \u6216 ",
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("code", { children: "#dsh-plugin" }),
		        " \u7684\u4ED3\u5E93\u5143\u6570\u636E\u7F13\u5B58\u5230\u672C\u5730\u6570\u636E\u5E93\uFF0C\u641C\u7D22\u52A0\u8F7D\u4E0D\u518D\u53D7\u7F51\u7EDC\u4E0E\u9650\u9891\u5F71\u54CD\u3002"
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dps-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { className: "dps-inline-label", children: "\u95F4\u9694\uFF08\u5C0F\u65F6\uFF0C0=\u5173\u95ED\uFF09" }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { className: "dps-input dps-input-num", type: "number", min: 0, max: 168, value: hours, onChange: (e) => setHours(e.target.value) }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dps-btn", disabled: busy === "schedule", onClick: () => void saveSchedule(), children: "\u4FDD\u5B58\u8BA1\u5212" }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dps-btn dps-btn-primary", disabled: busy === "sync" || status?.state === "syncing", onClick: () => void syncNow(), children: status?.state === "syncing" ? "\u540C\u6B65\u4E2D\u2026" : "\u7ACB\u5373\u540C\u6B65" })
		      ] }),
		      status && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dps-status", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dps-status-line", children: [
		          "\u72B6\u6001\uFF1A",
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: `dps-state-chip${status.state === "error" ? " off" : ""}`, children: status.state === "syncing" ? "\u540C\u6B65\u4E2D" : status.state === "error" ? "\u51FA\u9519" : "\u7A7A\u95F2" }),
		          status.lastSyncAt && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		            " \xB7 \u4E0A\u6B21\uFF1A",
		            formatDate(status.lastSyncAt),
		            "\uFF08",
		            status.lastSyncTotal,
		            " \u4E2A\u4ED3\u5E93\uFF09"
		          ] }),
		          status.nextSyncAt && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		            " \xB7 \u4E0B\u6B21\u8BA1\u5212\uFF1A",
		            formatDate(status.nextSyncAt)
		          ] })
		        ] }),
		        status.lastError && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dps-status-error", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_dsh_client_ui_primitives3.IconWarningOutline16, { size: 14 }),
		          " ",
		          status.lastError
		        ] })
		      ] })
		    ] })
		  ] });
		}

		// src/client/insights/index.tsx
		var import_react7 = require("react");

		// src/client/insights/usage-tab.tsx
		var import_react6 = require("react");
		var import_jsx_runtime6 = require("react/jsx-runtime");
		var CURRENT_PRICES = {
		  version: "2026-08-15",
		  effectiveFrom: "2026-08-15",
		  input: {
		    "deepseek:deepseek-chat": 0.27,
		    "deepseek:deepseek-reasoner": 0.55,
		    "openai:gpt-4o": 2.5,
		    "openai:gpt-4o-mini": 0.15,
		    "openai:gpt-4.1": 2,
		    "openai:gpt-4.1-mini": 0.4,
		    "openai:o3": 2,
		    "openai:o4-mini": 1.1,
		    "anthropic:claude-sonnet-4-20250514": 3,
		    "anthropic:claude-3-5-haiku-20241022": 0.8,
		    "anthropic:claude-3-5-sonnet-20241022": 3,
		    "google:gemini-2.5-pro": 1.25,
		    "google:gemini-2.5-flash": 0.3,
		    "qwen:qwen-plus": 0.4,
		    "qwen:qwen-max": 2.4,
		    "qwen:qwen-turbo": 0.3,
		    "zhipu:glm-4": 0.2,
		    "zhipu:glm-4-air": 0.06,
		    "moonshot:moonshot-v1-8k": 0.6,
		    "moonshot:moonshot-v1-32k": 1.2,
		    "moonshot:moonshot-v1-128k": 6
		  },
		  cacheRead: {
		    "deepseek:*": 0.07,
		    "deepseek:deepseek-reasoner": 0.14,
		    "openai:*": 1.25,
		    "anthropic:*": 0.3,
		    "google:*": 0.1,
		    "qwen:*": 0.1,
		    "zhipu:*": 0.05,
		    "moonshot:*": 0.1
		  },
		  cacheWrite: {
		    "deepseek:*": 0.27,
		    "deepseek:deepseek-reasoner": 0.55,
		    "openai:*": 2.5,
		    "anthropic:*": 3.75,
		    "google:*": 1.25,
		    "qwen:*": 0.4,
		    "zhipu:*": 0.2,
		    "moonshot:*": 0.6
		  },
		  output: {
		    "deepseek:deepseek-chat": 1.1,
		    "deepseek:deepseek-reasoner": 2.19,
		    "openai:gpt-4o": 10,
		    "openai:gpt-4o-mini": 0.6,
		    "openai:gpt-4.1": 8,
		    "openai:gpt-4.1-mini": 1.6,
		    "openai:o3": 8,
		    "openai:o4-mini": 4.4,
		    "anthropic:claude-sonnet-4-20250514": 15,
		    "anthropic:claude-3-5-haiku-20241022": 4,
		    "anthropic:claude-3-5-sonnet-20241022": 15,
		    "google:gemini-2.5-pro": 10,
		    "google:gemini-2.5-flash": 2.5,
		    "qwen:qwen-plus": 1.2,
		    "qwen:qwen-max": 9.6,
		    "qwen:qwen-turbo": 0.6,
		    "zhipu:glm-4": 0.2,
		    "zhipu:glm-4-air": 0.06,
		    "moonshot:moonshot-v1-8k": 0.6,
		    "moonshot:moonshot-v1-32k": 1.2,
		    "moonshot:moonshot-v1-128k": 6
		  }
		};
		function lookupPrice(table, provider, model) {
		  if (!provider || !model) return void 0;
		  return table[`${provider}:${model}`] ?? table[`${provider}:*`];
		}
		function estimateCost(point) {
		  const { provider, model, usage } = point;
		  const pIn = lookupPrice(CURRENT_PRICES.input, provider, model);
		  const pOut = lookupPrice(CURRENT_PRICES.output, provider, model);
		  const pCr = lookupPrice(CURRENT_PRICES.cacheRead, provider, model);
		  const pCw = lookupPrice(CURRENT_PRICES.cacheWrite, provider, model);
		  if (pIn === void 0 || pOut === void 0) return { usd: 0, known: false };
		  const usd = ((usage.inputTokens ?? 0) - (usage.cacheReadTokens ?? 0) - (usage.cacheWriteTokens ?? 0)) / 1e6 * pIn + (usage.cacheReadTokens ?? 0) / 1e6 * (pCr ?? pIn) + (usage.cacheWriteTokens ?? 0) / 1e6 * (pCw ?? pIn) + (usage.outputTokens ?? 0) / 1e6 * pOut;
		  return { usd, known: true };
		}
		function collectUsagePoints(nodes) {
		  const points = [];
		  for (const n of nodes) {
		    if (n.kind !== "assistant") continue;
		    const usage = n.usage;
		    if (!usage || !usage.inputTokens) continue;
		    const cfg = n.requestConfig;
		    const prov = n.provenance;
		    points.push({
		      time: n.time,
		      turn: n.turn,
		      model: cfg?.model ?? prov?.model ?? null,
		      provider: cfg?.provider ?? prov?.provider ?? null,
		      usage: {
		        inputTokens: usage.inputTokens,
		        outputTokens: usage.outputTokens,
		        cacheReadTokens: usage.cacheReadTokens,
		        cacheWriteTokens: usage.cacheWriteTokens,
		        reasoningTokens: usage.reasoningTokens
		      }
		    });
		  }
		  return points;
		}
		function aggregateTokens(points) {
		  const agg = { uncached: 0, cacheRead: 0, cacheWrite: 0, output: 0, reasoning: 0 };
		  for (const p of points) {
		    agg.uncached += p.usage.inputTokens ?? 0;
		    agg.cacheRead += p.usage.cacheReadTokens ?? 0;
		    agg.cacheWrite += p.usage.cacheWriteTokens ?? 0;
		    agg.output += p.usage.outputTokens ?? 0;
		    agg.reasoning += p.usage.reasoningTokens ?? 0;
		  }
		  return agg;
		}
		function hitRate(agg) {
		  const billed = agg.uncached + agg.cacheRead + agg.cacheWrite;
		  return billed <= 0 ? 0 : agg.cacheRead / billed;
		}
		function fmt(n) {
		  return n >= 1e3 ? `${(n / 1e3).toFixed(1)}k` : String(n);
		}
		var CHART_H = 240;
		var PAD = 12;
		var LEGEND = [
		  { key: "input", label: "\u8F93\u5165", color: "#378ADD" },
		  { key: "output", label: "\u8F93\u51FA", color: "#1D9E75" },
		  { key: "hit", label: "\u7F13\u5B58\u547D\u4E2D\u7387", color: "#534AB7" }
		];
		var TICK_INTERVALS = [1e3, 2e3, 5e3, 1e4, 3e4, 6e4, 12e4, 3e5, 6e5, 18e5, 36e5, 72e5, 216e5, 432e5];
		function pickTickInterval(spanMs) {
		  for (const iv of TICK_INTERVALS) {
		    if (spanMs / iv <= 8) return iv;
		  }
		  return TICK_INTERVALS[TICK_INTERVALS.length - 1];
		}
		function fmtClock(t) {
		  const d = new Date(t);
		  const hh = String(d.getHours()).padStart(2, "0");
		  const mm = String(d.getMinutes()).padStart(2, "0");
		  const ss = String(d.getSeconds()).padStart(2, "0");
		  return `${hh}:${mm}:${ss}`;
		}
		function InsightsUsageTab({ frame, tokenUsage, sessionId, t }) {
		  const tf = t ?? ((k) => k);
		  const points = (0, import_react6.useMemo)(() => collectUsagePoints(frame.nodes), [frame.nodes]);
		  const agg = (0, import_react6.useMemo)(() => aggregateTokens(points), [points]);
		  const rate = hitRate(agg);
		  const costInfo = (0, import_react6.useMemo)(() => {
		    let usd = 0;
		    let known = 0;
		    const models = /* @__PURE__ */ new Map();
		    for (const p of points) {
		      const c = estimateCost(p);
		      if (c.known) {
		        usd += c.usd;
		        known++;
		      }
		      const key = p.model ?? "\u6A21\u578B\u672A\u8BB0\u5F55(\u5386\u53F2\u6570\u636E)";
		      models.set(key, (models.get(key) ?? 0) + 1);
		    }
		    return { usd, known, total: points.length, models };
		  }, [points]);
		  const [viewport, setViewport] = (0, import_react6.useState)(null);
		  const drag = (0, import_react6.useRef)(null);
		  const svgRef = (0, import_react6.useRef)(null);
		  const full = (0, import_react6.useMemo)(() => {
		    if (points.length === 0) return null;
		    const t0 = points[0].time;
		    const t1 = Math.max(t0 + 1, points[points.length - 1].time);
		    return { t0, t1, span: t1 - t0 };
		  }, [points]);
		  const prevFullKey = (0, import_react6.useRef)("");
		  const fullKey = full ? `${full.t0}:${full.t1}:${points.length}` : "";
		  if (fullKey !== prevFullKey.current) {
		    prevFullKey.current = fullKey;
		    setViewport(full ? { start: full.t0, end: full.t1 } : null);
		  }
		  const [width, setWidth] = (0, import_react6.useState)(720);
		  (0, import_react6.useLayoutEffect)(() => {
		    const el = svgRef.current;
		    if (!el) return;
		    const update = () => setWidth(Math.max(200, el.clientWidth));
		    update();
		    const ro = new ResizeObserver(update);
		    ro.observe(el);
		    return () => ro.disconnect();
		  }, []);
		  const chart = (0, import_react6.useMemo)(() => {
		    if (!full || !viewport || points.length === 0) return null;
		    const { t0, t1 } = full;
		    const vStart = viewport.start;
		    const vEnd = viewport.end;
		    const vSpan = Math.max(1, vEnd - vStart);
		    const plotW = Math.max(50, width - PAD * 2);
		    const x = (time3) => PAD + (time3 - vStart) / vSpan * plotW;
		    const maxVal = Math.max(1, ...points.map((p) => Math.max(p.usage.inputTokens ?? 0, p.usage.outputTokens ?? 0, p.usage.reasoningTokens ?? 0)));
		    const y = (v) => PAD + CHART_H - v / maxVal * CHART_H;
		    const yHit = (r) => PAD + CHART_H - r * CHART_H;
		    const lineFor = (pick2) => points.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.time).toFixed(1)},${y(pick2(p)).toFixed(1)}`).join("");
		    const hitLine = points.map((p, i) => {
		      const billed = (p.usage.inputTokens ?? 0) + (p.usage.cacheReadTokens ?? 0) + (p.usage.cacheWriteTokens ?? 0);
		      const r = billed <= 0 ? 0 : (p.usage.cacheReadTokens ?? 0) / billed;
		      return `${i === 0 ? "M" : "L"}${x(p.time).toFixed(1)},${yHit(r).toFixed(1)}`;
		    }).join("");
		    const interval = pickTickInterval(vSpan);
		    const firstTick = Math.ceil(vStart / interval) * interval;
		    const ticks = [];
		    for (let t2 = firstTick; t2 <= vEnd; t2 += interval) {
		      ticks.push({ x: x(t2), time: t2 });
		    }
		    const fmtRange = () => `${fmtClock(vStart)} \u2013 ${fmtClock(vEnd)}`;
		    return {
		      inputLine: lineFor((p) => p.usage.inputTokens ?? 0),
		      outputLine: lineFor((p) => p.usage.outputTokens ?? 0),
		      hitLine,
		      ticks,
		      fmtTick: fmtClock,
		      range: fmtRange(),
		      viewport: { start: vStart, end: vEnd },
		      full: { start: t0, end: t1 }
		    };
		  }, [points, full, viewport, width]);
		  const onWheel = (0, import_react6.useCallback)((e) => {
		    if (!full || !chart) return;
		    const rect = e.currentTarget.getBoundingClientRect();
		    const rel = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
		    const { start, end } = chart.viewport;
		    const { start: fStart, end: fEnd } = chart.full;
		    const anchorTime = start + (end - start) * rel;
		    const factor = e.deltaY > 0 ? 1.25 : 0.8;
		    let newSpan = (end - start) * factor;
		    newSpan = Math.min(fEnd - fStart, Math.max(2e3, newSpan));
		    let newStart = anchorTime - (anchorTime - start) * factor;
		    newStart = Math.max(fStart, Math.min(fEnd - newSpan, newStart));
		    const newEnd = newStart + newSpan;
		    setViewport({ start: newStart, end: newEnd });
		  }, [full, chart]);
		  const onMouseDown = (0, import_react6.useCallback)((e) => {
		    drag.current = { x: e.clientX, start: chart?.viewport.start ?? 0, end: chart?.viewport.end ?? 1, moved: false };
		  }, [chart]);
		  const onMouseMove = (0, import_react6.useCallback)((e) => {
		    const d = drag.current;
		    if (!d || !chart || !width) return;
		    const rect = e.currentTarget.getBoundingClientRect();
		    const dx = e.clientX - d.x;
		    if (Math.abs(dx) > 2) d.moved = true;
		    if (!d.moved) return;
		    const { start: fStart, end: fEnd } = chart.full;
		    const span = d.end - d.start;
		    const dt = dx / rect.width * span;
		    let ns = d.start - dt;
		    let ne = d.end - dt;
		    if (ns < fStart) {
		      ne += fStart - ns;
		      ns = fStart;
		    }
		    if (ne > fEnd) {
		      ns -= ne - fEnd;
		      ne = fEnd;
		    }
		    setViewport({ start: ns, end: ne });
		  }, [chart, width]);
		  const onMouseUp = (0, import_react6.useCallback)(() => {
		    drag.current = null;
		  }, []);
		  const onDoubleClick = (0, import_react6.useCallback)(() => {
		    if (chart) setViewport({ start: chart.full.start, end: chart.full.end });
		  }, [chart]);
		  const zoomed = chart ? chart.viewport.end - chart.viewport.start < (chart.full.end - chart.full.start) * 0.99 : false;
		  if (points.length === 0) {
		    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-empty", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: tf("empty.usage") }),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "dps-muted-sm", children: tf("empty.usageHint") })
		    ] });
		  }
		  const pct = (rate * 100).toFixed(1);
		  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-tab-body", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-cards", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dps-ins-card-label", children: tf("usage.totalInput") }),
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dps-ins-card-value", children: fmt(agg.uncached + agg.cacheRead + agg.cacheWrite) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dps-ins-card-label", children: tf("usage.totalOutput") }),
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dps-ins-card-value", children: fmt(agg.output + agg.reasoning) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dps-ins-card-label", children: tf("usage.hitRate") }),
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "dps-ins-card-value", style: { color: "#1D9E75" }, children: [
		          pct,
		          "%"
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dps-ins-card-label", children: tf("usage.estimatedCost") }),
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dps-ins-card-value", style: { color: "#D85A30" }, children: costInfo.known === 0 ? "\u2014" : `$${costInfo.usd.toFixed(4)}` })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-chart-wrap", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
		        "svg",
		        {
		          ref: svgRef,
		          className: "dps-ins-chart",
		          viewBox: `0 0 ${Math.max(200, width)} ${CHART_H + PAD * 2 + 22}`,
		          role: "img",
		          "aria-label": "token \u7528\u91CF\u4E0E\u7F13\u5B58\u547D\u4E2D\u7387\u65F6\u95F4\u56FE\u8868\uFF08\u6EDA\u8F6E\u7F29\u653E\uFF0C\u62D6\u52A8\u5E73\u79FB\uFF0C\u53CC\u51FB\u590D\u4F4D\uFF09",
		          onWheel,
		          onMouseDown,
		          onMouseMove,
		          onMouseUp,
		          onMouseLeave: onMouseUp,
		          onDoubleClick,
		          style: { touchAction: "none", cursor: "grab", userSelect: "none" },
		          children: chart && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("line", { x1: PAD, y1: PAD + CHART_H, x2: Math.max(50, width - PAD), y2: PAD + CHART_H, stroke: "#888780", strokeWidth: 0.5 }),
		            chart.inputLine && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: chart.inputLine, fill: "none", stroke: "#378ADD", strokeWidth: 2, strokeLinejoin: "round" }),
		            chart.outputLine && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: chart.outputLine, fill: "none", stroke: "#1D9E75", strokeWidth: 2, strokeLinejoin: "round" }),
		            chart.hitLine && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: chart.hitLine, fill: "none", stroke: "#534AB7", strokeWidth: 1.4, strokeDasharray: "4 3", strokeLinejoin: "round" }),
		            chart.ticks.map((tk, i) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("g", { children: [
		              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("line", { x1: tk.x, y1: PAD + CHART_H, x2: tk.x, y2: PAD + CHART_H + 4, stroke: "#888780", strokeWidth: 0.5 }),
		              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("text", { x: tk.x, y: PAD + CHART_H + 16, textAnchor: "middle", fontSize: 10, fill: "#888780", children: chart.fmtTick(tk.time) })
		            ] }, i)),
		            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("text", { x: Math.max(50, width - PAD), y: PAD - 4, textAnchor: "end", fontSize: 10, fill: "#888780", children: chart.range })
		          ] })
		        }
		      ),
		      zoomed && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "dps-ins-chart-hint", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u6EDA\u8F6E\u7F29\u653E \xB7 \u62D6\u52A8\u5E73\u79FB \xB7 \u53CC\u51FB\u590D\u4F4D" }) })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "dps-ins-legend", children: LEGEND.map((l) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "dps-ins-legend-item", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", { style: { background: l.color } }),
		      l.label
		    ] }, l.key)) }),
		    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-meta", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-meta-title", children: [
		        tf("usage.modelMix"),
		        frame.running ? " \xB7 " + tf("state.installing") : ""
		      ] }),
		      [...costInfo.models.entries()].map(([m, c]) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-meta-row", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "dps-ins-meta-name", title: m, children: m }),
		        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "dps-muted-sm", children: [
		          c,
		          " \u6B21"
		        ] })
		      ] }, m)),
		      costInfo.models.has("\u6A21\u578B\u672A\u8BB0\u5F55(\u5386\u53F2\u6570\u636E)") && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "dps-muted-sm", children: "\u300C\u6A21\u578B\u672A\u8BB0\u5F55\u300D= \u8F83\u65E9\u7684\u4F1A\u8BDD\u65E5\u5FD7\u6CA1\u6709\u4FDD\u5B58\u6A21\u578B\u4FE1\u606F\uFF0C\u5C5E\u6B63\u5E38\u3002" }),
		      costInfo.total > 0 && costInfo.known < costInfo.total && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-ins-warn", children: [
		        "\u672A\u6536\u5F55\u6A21\u578B\u7684\u8D39\u7528\u672A\u8BA1\u5165\uFF08\u4EF7\u683C\u8868 v",
		        CURRENT_PRICES.version,
		        "\uFF09"
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "dps-muted-sm", children: [
		        "\u4F1A\u8BDD ",
		        sessionId.slice(0, 8),
		        " \xB7 \u4EF7\u683C\u8868 v",
		        CURRENT_PRICES.version,
		        "\uFF08",
		        CURRENT_PRICES.effectiveFrom,
		        " \u751F\u6548\uFF09"
		      ] })
		    ] })
		  ] });
		}

		// src/client/insights/index.tsx
		var import_jsx_runtime7 = require("react/jsx-runtime");
		function InsightsUsageView(props) {
		  const { useSession, useProjection, sessionId, t } = props;
		  const nodes = useSession((s) => s.nodes);
		  const running = useSession((s) => s.running);
		  const tokenUsage = useProjection("tokenUsage", (v) => v ?? null);
		  const frame = (0, import_react7.useMemo)(() => ({ nodes, running }), [nodes, running]);
		  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dps-usage", "data-plugin": "dsh-plugin-hub", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(InsightsUsageTab, { frame, tokenUsage, sessionId, t }) });
		}

		// src/client/store.css
		var store_default = "/* dsh-plugin-hub \u2014 native Harness look & feel (theme variables only) */\n\n/* ============ sidebar entry button (same geometry as settings trigger) ============ */\n.dps-entry {\n  box-sizing: border-box;\n  cursor: pointer;\n  width: calc(100% + 8px);\n  height: 34px;\n  color: var(--dsw-alias-label-primary);\n  background: 0 0;\n  border: none;\n  border-radius: 12px;\n  flex: none;\n  align-items: center;\n  gap: 8px;\n  margin: 4px -4px;\n  padding: 6px 2px 6px 10px;\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 22px;\n  display: flex;\n  overflow: hidden;\n}\n.dps-entry:hover { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-entry-rail { border-radius: 50%; justify-content: center; gap: 0; width: 36px; height: 36px; margin: 8px 0 10px; padding: 0; }\n.dps-entry-label { white-space: nowrap; overflow: hidden; }\n\n/* ============ store modal shell (mirrors the native settings dialog) ============ */\n.dps-overlay {\n  z-index: 1100;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  position: fixed;\n  inset: 0;\n}\n.dps-mask { background: var(--dsw-alias-bg-mask-1); backdrop-filter: var(--dsw-mask-blur); position: absolute; inset: 0; }\n.dps-panel {\n  z-index: 1;\n  background: var(--dsw-alias-bg-layer-2);\n  width: 1060px;\n  max-width: calc(100vw - 48px);\n  height: min(820px, 100vh - 48px);\n  box-shadow: var(--dsw-shadow-lv3);\n  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);\n  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);\n  border-radius: 24px;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\n.dps-nav { box-sizing: border-box; flex-direction: column; flex: none; gap: 12px; width: 176px; padding: 20px 10px 0; display: flex; }\n.dps-nav-title { color: var(--dsw-alias-label-primary); padding: 0 12px; font-size: 16px; font-weight: 600; line-height: 24px; }\n.dps-nav-list { flex-direction: column; gap: 4px; display: flex; }\n.dps-nav-cell {\n  box-sizing: border-box; cursor: pointer; height: 38px; color: var(--dsw-alias-label-primary);\n  text-align: left; background: 0 0; border: none; border-radius: 12px;\n  align-items: center; gap: 8px; padding: 8px 12px; font-family: inherit; font-size: 14px; line-height: 22px; display: flex;\n}\n.dps-nav-cell:hover { background: var(--dsw-specific-sidebar-nav-item-hover); }\n.dps-nav-cell.active { background: var(--dsw-specific-sidebar-nav-item-active); font-weight: 500; }\n.dps-nav-label { white-space: nowrap; text-overflow: ellipsis; flex: 1; min-width: 0; overflow: hidden; }\n.dps-nav-foot { margin-top: auto; padding: 8px 0 14px; justify-content: center; display: flex; }\n\n.dps-content { flex-direction: column; flex: 1; min-width: 0; display: flex; }\n.dps-header {\n  box-sizing: border-box; flex: none; justify-content: space-between; align-items: center; gap: 8px;\n  height: 54px; padding: 12px 16px 8px 4px; display: flex;\n}\n.dps-header-title { color: var(--dsw-alias-label-primary); font-size: 15px; font-weight: 600; padding-left: 12px; }\n.dps-actions { justify-content: flex-end; align-items: center; gap: 8px; display: flex; }\n.dps-close {\n  cursor: pointer; width: 28px; height: 28px; color: var(--dsw-alias-label-primary);\n  background: 0 0; border: none; border-radius: 28px; justify-content: center; align-items: center; padding: 0; display: inline-flex;\n}\n.dps-close:hover { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-body { flex: 1; min-height: 0; padding: 0 20px 20px 8px; overflow-y: auto; }\n\n.dps-view { flex-direction: column; gap: 14px; display: flex; min-height: 100%; }\n.dps-view-head { align-items: center; justify-content: space-between; gap: 8px; display: flex; }\n.dps-view-title { color: var(--dsw-alias-label-primary); font-size: 16px; font-weight: 600; margin: 0; }\n\n/* ============ toolbar / search / filters ============ */\n.dps-toolbar { flex-direction: column; gap: 10px; display: flex; }\n.dps-toolbar-inline { flex-direction: row; align-items: center; flex-wrap: wrap; }\n.dps-search {\n  box-sizing: border-box; align-items: center; gap: 8px; height: 36px; padding: 0 12px;\n  background: var(--dsw-specific-input-major); border: 1px solid var(--dsw-alias-border-l2); border-radius: 12px; display: flex;\n  color: var(--dsw-alias-label-secondary);\n}\n.dps-search:focus-within { border-color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); }\n.dps-search-input { flex: 1; min-width: 0; background: 0 0; border: none; outline: none; color: var(--dsw-alias-label-primary); font: inherit; }\n.dps-filters { align-items: center; justify-content: space-between; gap: 12px; display: flex; flex-wrap: wrap; }\n.dps-chips { align-items: center; gap: 6px; display: flex; flex-wrap: wrap; }\n.dps-chip {\n  cursor: pointer; height: 28px; padding: 0 12px; border-radius: 14px; border: 1px solid var(--dsw-alias-border-l2);\n  background: 0 0; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 13px;\n}\n.dps-chip:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }\n.dps-chip.active { background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary-foreground); border-color: transparent; font-weight: 500; }\n.dps-filter-right { align-items: center; gap: 12px; display: flex; }\n.dps-select {\n  height: 30px; padding: 0 8px; border-radius: 10px; border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-specific-input-major); color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; cursor: pointer;\n}\n.dps-check { align-items: center; gap: 6px; color: var(--dsw-alias-label-secondary); font-size: 13px; display: flex; cursor: pointer; }\n\n/* ============ plugin grid / cards ============ */\n.dps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }\n.dps-card {\n  box-sizing: border-box; cursor: pointer; flex-direction: column; gap: 8px; padding: 14px;\n  background: var(--dsw-alias-bg-layer-1, var(--dsw-specific-input-major));\n  border: 1px solid var(--dsw-alias-border-l2); border-radius: 16px; display: flex;\n  transition: border-color .12s, transform .12s;\n}\n.dps-card:hover { border-color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); transform: translateY(-1px); }\n.dps-card-top { align-items: center; gap: 10px; display: flex; }\n.dps-icon-img { border-radius: 10px; flex: none; object-fit: cover; }\n.dps-icon-fallback {\n  border-radius: 10px; flex: none; display: inline-flex; align-items: center; justify-content: center;\n  background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-secondary);\n  font-weight: 600;\n}\n.dps-card-head { min-width: 0; flex-direction: column; display: flex; }\n.dps-card-name { color: var(--dsw-alias-label-primary); font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dps-card-developer { color: var(--dsw-alias-label-tertiary); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dps-card-desc {\n  color: var(--dsw-alias-label-secondary); font-size: 13px; line-height: 19px; margin: 0;\n  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 38px;\n}\n.dps-card-meta { align-items: flex-start; justify-content: space-between; gap: 8px; display: flex; flex-wrap: wrap; }\n.dps-card-stats { align-items: center; gap: 10px; display: flex; flex-wrap: wrap; }\n.dps-stat { align-items: center; gap: 3px; color: var(--dsw-alias-label-tertiary); font-size: 12px; display: inline-flex; }\n.dps-card-actions { align-items: center; justify-content: space-between; gap: 8px; display: flex; }\n.dps-card-version { color: var(--dsw-alias-label-tertiary); font-size: 12px; }\n\n/* ============ stars / badges / chips ============ */\n.dps-stars { align-items: center; gap: 6px; display: inline-flex; font-size: 12px; color: var(--dsw-alias-label-secondary); }\n.dps-stars-icons { display: inline-flex; gap: 1px; color: var(--dsw-alias-label-tertiary); }\n.dps-star { color: var(--dsw-alias-label-tertiary); }\n.dps-star.on { color: #f5b301; }\n.dps-star.half { color: #f5b301; opacity: .55; }\n.dps-stars-num { font-weight: 600; color: var(--dsw-alias-label-primary); }\n.dps-stars-count { color: var(--dsw-alias-label-tertiary); }\n.dps-badges { display: inline-flex; gap: 4px; flex-wrap: wrap; }\n.dps-badge {\n  font-size: 11px; line-height: 16px; padding: 0 7px; border-radius: 8px;\n  background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-secondary);\n}\n.dps-badge-tool { background: rgba(65, 118, 230, .14); color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); }\n.dps-badge-agent { background: rgba(163, 90, 247, .16); color: #a35af7; }\n.dps-badge-ui { background: rgba(240, 140, 60, .15); color: #f08c3c; }\n.dps-badge-data { background: rgba(46, 158, 91, .15); color: #2e9e5b; }\n.dps-badge-other { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-secondary); }\n.dps-badge-npm { background: rgba(46, 158, 91, .14); color: #2e9e5b; }\n.dps-badge-github { background: rgba(224, 82, 82, .12); color: #e05252; }\n.dps-badge-own-unpub { background: rgba(186, 117, 23, .14); color: #b87517; }\n.dps-state-chip {\n  font-size: 12px; padding: 2px 10px; border-radius: 10px; display: inline-block;\n  background: rgba(46, 158, 91, .16); color: #2e9e5b; font-weight: 500;\n}\n.dps-state-chip.off { background: rgba(224, 82, 82, .14); color: #e05252; }\n.dps-action-chip { font-size: 12px; padding: 2px 8px; border-radius: 8px; background: rgba(65, 118, 230, .14); color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); }\n.dps-action-chip.alt { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-secondary); }\n.dps-result-chip { font-size: 12px; padding: 2px 8px; border-radius: 8px; background: rgba(46, 158, 91, .16); color: #2e9e5b; }\n.dps-result-chip.fail { background: rgba(224, 82, 82, .14); color: #e05252; }\n\n/* ============ buttons / inputs ============ */\n.dps-btn {\n  box-sizing: border-box; cursor: pointer; height: 32px; padding: 0 14px; border-radius: 10px;\n  border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-button-floating-fill);\n  color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; align-items: center; justify-content: center; gap: 6px; display: inline-flex;\n  text-decoration: none; white-space: nowrap;\n}\n.dps-btn:hover { background: var(--dsw-alias-button-floating-hover); }\n.dps-btn:disabled { opacity: .5; cursor: not-allowed; }\n.dps-btn-primary { background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary-foreground); border-color: transparent; }\n.dps-btn-primary:hover { background: var(--dsw-alias-brand-primary); filter: brightness(1.1); }\n.dps-btn-danger { background: rgba(224, 82, 82, .14); color: #e05252; border-color: transparent; }\n.dps-btn-danger:hover { background: rgba(224, 82, 82, .22); }\n.dps-btn-ghost { background: 0 0; border-color: transparent; color: var(--dsw-alias-label-secondary); }\n.dps-btn-sm { height: 26px; padding: 0 10px; font-size: 12px; border-radius: 8px; }\n.dps-icon-btn {\n  cursor: pointer; width: 26px; height: 26px; color: var(--dsw-alias-label-secondary); background: 0 0;\n  border: none; border-radius: 8px; align-items: center; justify-content: center; padding: 0; display: inline-flex; font-size: 14px;\n}\n.dps-icon-btn:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }\n.dps-input {\n  box-sizing: border-box; height: 32px; min-width: 0; padding: 0 10px; border-radius: 10px;\n  border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-specific-input-major);\n  color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px;\n}\n.dps-input:focus { outline: none; border-color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); }\n.dps-input-num { width: 76px; }\n.dps-input-sm { height: 30px; width: 140px; }\n.dps-inline-label { color: var(--dsw-alias-label-secondary); font-size: 13px; white-space: nowrap; }\n\n/* ============ detail ============ */\n.dps-detail { gap: 12px; }\n.dps-detail-head { align-items: center; gap: 12px; display: flex; flex-wrap: wrap; }\n.dps-back { flex: none; }\n.dps-detail-title { min-width: 0; flex: 1; flex-direction: column; gap: 4px; display: flex; }\n.dps-detail-name-row { align-items: center; gap: 10px; display: flex; flex-wrap: wrap; }\n.dps-detail-name { color: var(--dsw-alias-label-primary); font-size: 20px; font-weight: 700; margin: 0; }\n.dps-detail-sub { align-items: center; gap: 8px; color: var(--dsw-alias-label-secondary); font-size: 13px; display: flex; flex-wrap: wrap; }\n.dps-dot { color: var(--dsw-alias-label-tertiary); }\n.dps-detail-actions { align-items: center; gap: 8px; display: flex; flex-wrap: wrap; }\n.dps-install-progress { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }\n.dps-install-progress-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 12px; }\n.dps-install-progress-label { color: var(--dsw-alias-label-primary); font-variant-numeric: tabular-nums; }\n.dps-install-progress-track { height: 6px; border-radius: 3px; background: var(--dsw-alias-interactive-bg-hover); overflow: hidden; position: relative; }\n.dps-install-progress-bar { height: 100%; border-radius: 3px; background: #378ADD; transition: width .3s ease; }\n.dps-install-progress-bar.indeterminate {\n  width: 30% !important; animation: dps-indeterminate 1.2s ease-in-out infinite;\n}\n@keyframes dps-indeterminate {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(400%); }\n}\n\n.dps-tabs { border-bottom: 1px solid var(--dsw-alias-border-l2); align-items: center; gap: 4px; display: flex; overflow-x: auto; }\n.dps-tab {\n  cursor: pointer; height: 36px; padding: 0 12px; background: 0 0; border: none; border-bottom: 2px solid transparent;\n  color: var(--dsw-alias-label-secondary); font: inherit; font-size: 13px; white-space: nowrap;\n}\n.dps-tab:hover { color: var(--dsw-alias-label-primary); }\n.dps-tab.active { color: var(--dsw-alias-label-primary); border-bottom-color: var(--dsw-alias-brand-primary); font-weight: 600; }\n.dps-tab-body { padding: 14px 2px 4px; }\n\n.dps-screenshots { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px; }\n.dps-screenshot img { height: 150px; border-radius: 12px; border: 1px solid var(--dsw-alias-border-l2); object-fit: cover; }\n.dps-topics { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }\n.dps-topic { font-size: 12px; color: var(--dsw-alias-label-tertiary); background: var(--dsw-alias-interactive-bg-hover); padding: 2px 8px; border-radius: 8px; }\n\n.dps-table { width: 100%; border-collapse: collapse; font-size: 13px; }\n.dps-table th {\n  text-align: left; color: var(--dsw-alias-label-tertiary); font-weight: 500; font-size: 12px;\n  padding: 6px 10px; border-bottom: 1px solid var(--dsw-alias-border-l2); white-space: nowrap;\n}\n.dps-table td { padding: 8px 10px; color: var(--dsw-alias-label-secondary); border-bottom: 1px solid var(--dsw-alias-border-l2); vertical-align: top; }\n.dps-table tr:hover td { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-strong { color: var(--dsw-alias-label-primary); font-weight: 600; }\n\n/* ---- Installed: category / group / switch ---- */\n.dps-inst { display: flex; flex-direction: column; gap: 18px; }\n.dps-inst-cat { border: 1px solid var(--dsw-alias-border-l2); border-radius: 12px; overflow: hidden; }\n.dps-inst-cat-head {\n  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;\n  padding: 12px 14px; background: var(--dsw-alias-interactive-bg-hover); border-bottom: 1px solid var(--dsw-alias-border-l2);\n}\n.dps-inst-cat-title h4 { margin: 0; font-size: 14px; font-weight: 600; color: var(--dsw-alias-label-primary); }\n.dps-inst-cat-actions { display: flex; align-items: center; gap: 10px; }\n.dps-inst-group { border-bottom: 1px solid var(--dsw-alias-border-l2); }\n.dps-inst-group:last-child { border-bottom: none; }\n.dps-inst-group-head {\n  display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; user-select: none;\n}\n.dps-inst-group-head:hover { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-inst-caret { color: var(--dsw-alias-label-tertiary); font-size: 12px; width: 14px; }\n.dps-inst-group-label { font-size: 13px; font-weight: 600; color: var(--dsw-alias-label-primary); }\n.dps-inst-group-count { font-size: 12px; color: var(--dsw-alias-label-tertiary); }\n.dps-inst-group-state { margin-left: auto; font-size: 12px; color: var(--dsw-alias-label-tertiary); }\n.dps-inst-group-body { padding: 0 14px 8px; }\n.dps-inst-row {\n  display: flex; align-items: center; justify-content: space-between; gap: 10px;\n  padding: 8px 6px; border-radius: 8px;\n}\n.dps-inst-row:hover { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-inst-row.off { opacity: .62; }\n.dps-inst-info { display: flex; align-items: center; gap: 8px; min-width: 0; cursor: pointer; flex: 1; }\n.dps-inst-name { font-size: 13px; color: var(--dsw-alias-label-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dps-inst-path { font-size: 11px; color: var(--dsw-alias-label-tertiary); font-family: var(--font-mono, monospace); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 320px; }\n.dps-inst-actions { display: flex; align-items: center; gap: 8px; }\n.dps-switch {\n  position: relative; width: 34px; height: 20px; border-radius: 10px; border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-interactive-bg-hover); cursor: pointer; padding: 0; transition: background .15s ease; flex: none;\n}\n.dps-switch.on { background: rgba(46, 158, 91, .55); border-color: rgba(46, 158, 91, .6); }\n.dps-switch.locked { opacity: .55; cursor: not-allowed; }\n.dps-switch:disabled { cursor: default; }\n.dps-switch-knob {\n  position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%;\n  background: var(--dsw-alias-label-secondary); transition: transform .15s ease;\n}\n.dps-switch.on .dps-switch-knob { transform: translateX(14px); background: #fff; }\n.dps-empty-sm { padding: 12px; }\n.dps-cell-ellipsis { max-width: 340px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dps-cell-nowrap { white-space: nowrap; }\n.dps-cell-actions { white-space: nowrap; }\n.dps-link-cell { cursor: pointer; color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); background: 0 0; border: none; font: inherit; padding: 0; text-align: left; }\n.dps-link-cell:hover { text-decoration: underline; }\n.dps-muted-sm { color: var(--dsw-alias-label-tertiary); font-size: 12px; margin-left: 6px; }\n\n/* ============ dependency graph ============ */\n.dps-graph { flex-direction: column; gap: 10px; display: flex; }\n.dps-graph svg { max-width: 100%; }\n.dps-graph-node-label { fill: var(--dsw-alias-label-primary); font-size: 11px; }\n.dps-graph-node-sub { fill: var(--dsw-alias-label-tertiary); font-size: 9px; }\n.dps-graph-root-label { fill: var(--dsw-alias-label-primary); font-size: 13px; font-weight: 700; }\n.dps-graph-root-sub { fill: var(--dsw-alias-label-tertiary); font-size: 9px; }\n.dps-graph-col-label { fill: var(--dsw-alias-label-secondary); font-size: 11px; font-weight: 600; }\n.dps-graph-more { fill: var(--dsw-alias-label-tertiary); font-size: 10px; }\n.dps-graph-legend { align-items: center; gap: 16px; display: flex; flex-wrap: wrap; font-size: 12px; color: var(--dsw-alias-label-secondary); }\n.dps-legend-item { align-items: center; gap: 6px; display: inline-flex; }\n.dps-legend-dep { width: 12px; height: 12px; border-radius: 4px; background: rgba(224, 82, 82, .25); border: 1px solid #e05252; display: inline-block; }\n.dps-legend-depen { width: 12px; height: 12px; border-radius: 4px; background: rgba(65, 118, 230, .25); border: 1px solid #4176e6; display: inline-block; }\n.dps-legend-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--dsw-alias-state-success-primary, #2e9e5b); display: inline-block; }\n.dps-graph-hint { color: var(--dsw-alias-label-tertiary); font-size: 12px; margin: 0; }\n\n/* ============ ratings / reviews ============ */\n.dps-rate-box { border: 1px solid var(--dsw-alias-border-l2); border-radius: 14px; padding: 12px 14px; gap: 10px; flex-direction: column; display: flex; margin-bottom: 14px; }\n.dps-rate-title { color: var(--dsw-alias-label-primary); font-size: 13px; font-weight: 600; }\n.dps-rate-row { align-items: center; gap: 10px; display: flex; flex-wrap: wrap; }\n.dps-star-input { display: inline-flex; gap: 2px; }\n.dps-star-btn { cursor: pointer; background: 0 0; border: none; font-size: 22px; color: var(--dsw-alias-label-tertiary); padding: 0 2px; }\n.dps-star-btn.on { color: #f5b301; }\n.dps-rate-comment { flex: 1; min-width: 180px; }\n.dps-reviews { list-style: none; margin: 0; padding: 0; gap: 10px; display: flex; flex-direction: column; }\n.dps-review { border: 1px solid var(--dsw-alias-border-l2); border-radius: 12px; padding: 10px 12px; }\n.dps-review-head { align-items: center; gap: 8px; display: flex; flex-wrap: wrap; }\n.dps-review-actor { color: var(--dsw-alias-label-primary); font-weight: 600; font-size: 13px; }\n.dps-review-time { color: var(--dsw-alias-label-tertiary); font-size: 12px; margin-left: auto; }\n.dps-review-comment { color: var(--dsw-alias-label-secondary); font-size: 13px; line-height: 20px; margin: 6px 0 0; }\n\n/* ============ settings (native section + modal) ============ */\n.dps-settings-native { flex-direction: column; gap: 16px; display: flex; }\n.dps-native-hero { align-items: center; gap: 10px; display: flex; flex-wrap: wrap; font-size: 15px; font-weight: 600; color: var(--dsw-alias-label-primary); }\n.dps-native-hero .dps-btn { margin-left: auto; }\n.dps-section { border: 1px solid var(--dsw-alias-border-l2); border-radius: 14px; padding: 14px 16px; flex-direction: column; gap: 10px; display: flex; }\n.dps-section-title { align-items: center; gap: 8px; margin: 0; font-size: 14px; font-weight: 600; color: var(--dsw-alias-label-primary); display: flex; }\n.dps-row { align-items: center; gap: 10px; display: flex; flex-wrap: wrap; }\n.dps-hint { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; margin: 0; }\n.dps-hint code, .dps-scaffold-desc code, .dps-step-text code { background: var(--dsw-alias-interactive-bg-hover); padding: 1px 5px; border-radius: 6px; font-size: 12px; }\n.dps-status { flex-direction: column; gap: 6px; display: flex; font-size: 13px; color: var(--dsw-alias-label-secondary); }\n.dps-status-line { align-items: center; gap: 6px; display: flex; flex-wrap: wrap; }\n.dps-status-error { color: #e05252; align-items: center; gap: 6px; display: flex; font-size: 12px; }\n\n/* ============ audit pager ============ */\n.dps-pager { align-items: center; justify-content: center; gap: 12px; display: flex; padding: 12px 0; }\n.dps-pager-info { color: var(--dsw-alias-label-secondary); font-size: 13px; }\n\n/* ============ scaffold ============ */\n.dps-scaffold-hero {\n  border: 1px solid var(--dsw-alias-border-l2); border-radius: 16px; padding: 18px;\n  background: linear-gradient(135deg, rgba(65, 118, 230, .12), rgba(163, 90, 247, .08));\n  align-items: flex-start; gap: 14px; display: flex;\n}\n.dps-scaffold-hero-icon { flex: none; width: 46px; height: 46px; border-radius: 14px; background: var(--dsw-alias-button-elevated-fill); align-items: center; justify-content: center; display: flex; color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); }\n.dps-scaffold-title { margin: 0; font-size: 17px; font-weight: 700; color: var(--dsw-alias-label-primary); }\n.dps-scaffold-desc { margin: 4px 0 0; color: var(--dsw-alias-label-secondary); font-size: 13px; line-height: 20px; }\n.dps-steps { list-style: none; margin: 0; padding: 0; gap: 14px; display: flex; flex-direction: column; counter-reset: step; }\n.dps-step { display: flex; gap: 12px; }\n.dps-step-num {\n  flex: none; width: 28px; height: 28px; border-radius: 50%; align-items: center; justify-content: center; display: flex;\n  background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary-foreground); font-weight: 700; font-size: 13px;\n}\n.dps-step-body { flex-direction: column; gap: 6px; display: flex; min-width: 0; }\n.dps-step-title { color: var(--dsw-alias-label-primary); font-size: 14px; font-weight: 600; }\n.dps-step-text { color: var(--dsw-alias-label-secondary); font-size: 13px; line-height: 20px; margin: 0; }\n.dps-cmd-list { flex-direction: column; gap: 6px; display: flex; }\n.dps-cmd {\n  align-items: center; gap: 8px; display: flex; border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px;\n  background: var(--dsw-specific-input-major); padding: 6px 8px 6px 12px;\n}\n.dps-cmd-code { flex: 1; min-width: 0; color: var(--dsw-alias-label-primary); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dps-scaffold-cats { align-items: center; gap: 6px; display: flex; flex-wrap: wrap; font-size: 13px; color: var(--dsw-alias-label-secondary); }\n.dps-scaffold-links { align-items: center; gap: 10px; display: flex; flex-wrap: wrap; }\n\n/* ============ markdown ============ */\n.dps-md { color: var(--dsw-alias-label-primary); font-size: 13.5px; line-height: 1.7; word-break: break-word; }\n.dps-md-h1, .dps-md-h2, .dps-md-h3, .dps-md-h4 { color: var(--dsw-alias-label-primary); margin: 16px 0 8px; line-height: 1.35; }\n.dps-md-h1 { font-size: 20px; } .dps-md-h2 { font-size: 17px; } .dps-md-h3 { font-size: 15px; } .dps-md-h4 { font-size: 13.5px; }\n.dps-md-p { margin: 8px 0; color: var(--dsw-alias-label-primary); }\n.dps-md-link { color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); text-decoration: none; }\n.dps-md-link:hover { text-decoration: underline; }\n.dps-md-code { background: var(--dsw-alias-interactive-bg-hover); padding: 1px 5px; border-radius: 6px; font-size: 12.5px; }\n.dps-md-pre {\n  background: var(--dsw-specific-input-major); border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px;\n  padding: 10px 12px; overflow-x: auto; margin: 10px 0;\n}\n.dps-md-pre-code { color: var(--dsw-alias-label-primary); font-size: 12.5px; white-space: pre; }\n.dps-md-quote { border-left: 3px solid var(--dsw-alias-brand-primary-new-colorprimary-new-color); margin: 10px 0; padding: 4px 12px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-interactive-bg-hover); border-radius: 0 8px 8px 0; }\n.dps-md-ul, .dps-md-ol { margin: 8px 0; padding-left: 22px; color: var(--dsw-alias-label-primary); }\n.dps-md-ul li, .dps-md-ol li { margin: 3px 0; }\n.dps-md-hr { border: none; border-top: 1px solid var(--dsw-alias-border-l2); margin: 14px 0; }\n.dps-md-table-wrap { overflow-x: auto; margin: 10px 0; }\n.dps-md-table { border-collapse: collapse; font-size: 12.5px; }\n.dps-md-table th, .dps-md-table td { border: 1px solid var(--dsw-alias-border-l2); padding: 5px 10px; color: var(--dsw-alias-label-primary); }\n.dps-md-table th { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-md-img { max-width: 100%; border-radius: 10px; margin: 8px 0; }\n\n/* ============ misc ============ */\n.dps-empty {\n  align-items: center; justify-content: center; gap: 8px; min-height: 180px; flex: 1;\n  color: var(--dsw-alias-label-tertiary); font-size: 13px; flex-direction: column; display: flex; text-align: center; padding: 20px;\n}\n.dps-empty p { margin: 4px 0; }\n.dps-empty-hint { font-size: 12px; max-width: 420px; }\n.dps-error {\n  align-items: center; gap: 8px; padding: 8px 12px; border-radius: 10px; display: flex;\n  background: rgba(224, 82, 82, .12); color: #e05252; font-size: 13px;\n}\n.dps-error-text { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }\n.dps-error-detail-toggle {\n  appearance: none; border: none; background: transparent; color: inherit; cursor: pointer;\n  font-size: 11px; text-decoration: underline; padding: 0;\n}\n.dps-error-detail {\n  width: 100%; margin: 4px 0 0; padding: 8px 10px; max-height: 220px; overflow: auto;\n  background: rgba(0, 0, 0, .25); border-radius: 6px; font-size: 11px; line-height: 1.5;\n  font-family: var(--font-mono, monospace); white-space: pre-wrap; word-break: break-all;\n}\n.dps-notice { padding: 8px 12px; border-radius: 10px; background: rgba(46, 158, 91, .14); color: #2e9e5b; font-size: 13px; }\n.dps-notice-ok { display: inline-flex; align-items: center; gap: 10px; }\n.dps-loadmore { justify-content: center; padding: 10px 0 4px; display: flex; }\n.dps-muted { color: var(--dsw-alias-label-tertiary); }\n\n/* ---- publish view ---- */\n.dps-publish-grid { display: flex; flex-direction: column; gap: 14px; max-width: 860px; }\n.dps-input-area { width: 100%; resize: vertical; font-family: inherit; line-height: 1.5; }\n.dps-publish-result-fail { margin-top: 12px; padding: 10px 12px; border: 1px solid rgba(224, 82, 82, .35); border-radius: 10px; color: #e05252; font-size: 13px; }\n.dps-publish-result-fail pre { margin: 8px 0 0; white-space: pre-wrap; word-break: break-all; font-size: 12px; max-height: 220px; overflow: auto; }\n.dps-security-blocked { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; }\n.dps-security-warning { margin-top: 12px; padding: 10px 12px; border: 1px solid rgba(186, 117, 23, .4); border-radius: 10px; color: #ba7517; font-size: 13px; }\n.dps-security-item { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }\n.dps-security-sev { font-weight: 600; white-space: nowrap; }\n.dps-security-item code { background: rgba(224, 82, 82, .1); padding: 1px 6px; border-radius: 5px; font-size: 12px; }\n/* markdown editor / preview */\n.dps-md-tabs { display: inline-flex; gap: 4px; margin-bottom: 6px; }\n.dps-md-tab { padding: 3px 12px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l2); background: transparent; color: var(--dsw-alias-label-secondary); font-size: 12px; cursor: pointer; }\n.dps-md-tab.on { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-border-l3); }\n.dps-md-preview { border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; padding: 12px 14px; min-height: 140px; max-height: 360px; overflow: auto; background: var(--dsw-alias-interactive-bg-hover); font-size: 13px; line-height: 1.6; color: var(--dsw-alias-label-primary); }\n.dps-md-preview h2 { font-size: 17px; margin: 10px 0 6px; }\n.dps-md-preview h3 { font-size: 15px; margin: 8px 0 4px; }\n.dps-md-preview h4 { font-size: 14px; margin: 6px 0 4px; }\n.dps-md-preview p { margin: 4px 0; }\n.dps-md-preview ul { margin: 4px 0; padding-left: 20px; }\n.dps-md-preview code { background: rgba(127, 127, 127, .15); padding: 1px 5px; border-radius: 5px; font-size: 12px; }\n.dps-md-preview pre.dps-md-pre { background: rgba(127, 127, 127, .12); padding: 8px 10px; border-radius: 8px; overflow: auto; }\n.dps-md-preview pre.dps-md-pre code { background: none; padding: 0; }\n.dps-md-preview img.dps-md-img { max-width: 100%; border-radius: 8px; margin: 6px 0; }\n.dps-md-preview a { color: #378ADD; }\n/* issues board */\n.dps-issues-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; font-size: 13px; color: var(--dsw-alias-label-secondary); }\n.dps-issues { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }\n.dps-issue { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 8px 10px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; }\n.dps-issue-link { display: inline-flex; align-items: baseline; gap: 8px; min-width: 0; color: var(--dsw-alias-label-primary); text-decoration: none; }\n.dps-issue-link:hover { color: #378ADD; }\n.dps-issue-state { font-size: 12px; flex-shrink: 0; }\n.dps-issue-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dps-issue-meta { flex-shrink: 0; white-space: nowrap; }\n.dps-badge-update { background: rgba(55, 138, 221, .16); color: #378ADD; border: 1px solid rgba(55, 138, 221, .35); }\n/* ---- health hub ---- */\n.dps-h-summary { display: flex; gap: 14px; flex-wrap: wrap; margin: 12px 0; }\n.dps-h-summary-item { display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; font-size: 13px; }\n.dps-h-summary-item b { font-size: 15px; }\n.dps-h-list { display: flex; flex-direction: column; gap: 6px; }\n.dps-h-row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; cursor: pointer; }\n.dps-h-row:hover { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-h-score-ring { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; border: 3px solid; font-size: 14px; font-weight: 700; }\n.dps-h-row-main { flex: 1; min-width: 0; }\n.dps-h-row-name { font-size: 14px; font-weight: 600; }\n.dps-h-row-meta { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-top: 4px; font-size: 12px; }\n.dps-h-level { font-size: 13px; font-weight: 600; white-space: nowrap; }\n.dps-h-detail-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }\n.dps-h-title { font-size: 17px; margin: 0; }\n.dps-h-sub { display: flex; align-items: center; gap: 8px; font-size: 13px; margin-top: 2px; color: var(--dsw-alias-label-secondary); }\n.dps-h-metrics { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }\n.dps-h-metric { display: flex; flex-direction: column; gap: 2px; padding: 8px 14px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; font-size: 14px; font-weight: 600; }\n.dps-h-metric-label { font-size: 11px; font-weight: 400; color: var(--dsw-alias-label-tertiary); }\n.dps-h-repo { text-decoration: none; color: #378ADD; }\n.dps-h-bar-row { display: flex; align-items: center; gap: 10px; margin: 6px 0; }\n.dps-h-bar-label { width: 72px; font-size: 12px; color: var(--dsw-alias-label-secondary); flex-shrink: 0; }\n.dps-h-bar-track { flex: 1; height: 8px; border-radius: 4px; background: var(--dsw-alias-interactive-bg-hover); overflow: hidden; }\n.dps-h-bar-fill { height: 100%; border-radius: 4px; background: #378ADD; }\n.dps-h-bar-fill.lv-healthy { background: #2e9e5b; }\n.dps-h-bar-fill.lv-attention { background: #d18a2a; }\n.dps-h-bar-fill.lv-stale { background: #d64545; }\n.dps-h-bar-val { width: 42px; text-align: right; font-size: 12px; color: var(--dsw-alias-label-secondary); flex-shrink: 0; }\n.dps-h-timeline { width: 100%; max-width: 760px; background: var(--dsw-alias-interactive-bg-hover); border-radius: 10px; }\n/* health leaderboard */\n.dps-rank-list { display: flex; flex-direction: column; gap: 4px; max-width: 760px; }\n.dps-rank-row { display: flex; align-items: center; gap: 14px; padding: 10px 14px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; cursor: pointer; }\n.dps-rank-row:hover { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-rank-num { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: 700; font-size: 14px; background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-secondary); flex-shrink: 0; }\n.dps-rank-num.top1 { background: rgba(224, 160, 32, .2); color: #e0a020; }\n.dps-rank-num.top2 { background: rgba(160, 165, 175, .22); color: #9aa0ab; }\n.dps-rank-num.top3 { background: rgba(190, 120, 60, .2); color: #b0783c; }\n.dps-rank-main { flex: 1; min-width: 0; }\n.dps-rank-name { font-size: 14px; font-weight: 600; }\n.dps-rank-score { font-size: 20px; font-weight: 800; color: #378ADD; font-variant-numeric: tabular-nums; }\n.dps-h-score-text { font-size: 14px; font-weight: 700; }\n/* trust badges */\n.dps-trust-official { background: rgba(224, 160, 32, .16); color: #b8860b; border: 1px solid rgba(224, 160, 32, .4); }\n.dps-trust-verified { background: rgba(46, 158, 91, .14); color: #2e9e5b; border: 1px solid rgba(46, 158, 91, .35); }\n.dps-trust-community { background: rgba(55, 138, 221, .14); color: #378ADD; border: 1px solid rgba(55, 138, 221, .35); }\n.dps-trust-unreviewed { background: rgba(127, 127, 127, .14); color: #888; border: 1px solid rgba(127, 127, 127, .3); }\n/* ---- wiki ---- */\n.dps-wiki-toolbar { display: flex; gap: 8px; align-items: center; margin: 10px 0; flex-wrap: wrap; }\n.dps-wiki-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 12px; }\n.dps-wiki-name { font-size: 16px; font-weight: 700; }\n.dps-wiki-desc { margin: 4px 0 0; font-size: 13px; color: var(--dsw-alias-label-secondary); }\n.dps-wiki-facts { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 8px; font-size: 12px; }\n.dps-wiki-link { color: #378ADD; text-decoration: none; }\n.dps-wiki-text { font-size: 13px; line-height: 1.6; margin: 4px 0; }\n.dps-wiki-markdown { font-size: 13px; line-height: 1.6; }\n.dps-wiki-install { margin-bottom: 14px; border: 1px solid var(--dsw-alias-divider-color, rgba(128, 128, 128, .2)); border-radius: 10px; background: var(--dsw-alias-interactive-bg-hover); }\n.dps-wiki-install-summary { cursor: pointer; padding: 8px 12px; font-size: 13px; font-weight: 500; user-select: none; }\n.dps-wiki-install-summary .dps-muted-sm { font-weight: 400; }\n.dps-wiki-install-body { padding: 0 12px 10px; }\n.dps-btn-back { margin-bottom: 10px; }\n.dps-skill-content { max-height: 520px; overflow: auto; }\n.dps-filter-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 10px; }\n.dps-filter-sep { width: 1px; height: 18px; background: var(--dsw-alias-divider-color, rgba(128,128,128,.25)); margin: 0 4px; }\n.dps-wiki-markdown h1, .dps-wiki-markdown h2, .dps-wiki-markdown h3, .dps-wiki-markdown h4 { margin: 10px 0 4px; font-size: 14px; }\n.dps-wiki-markdown code { background: rgba(127, 127, 127, .15); padding: 1px 5px; border-radius: 5px; font-size: 12px; }\n.dps-wiki-markdown pre { background: rgba(127, 127, 127, .12); padding: 8px 10px; border-radius: 8px; overflow: auto; }\n.dps-wiki-markdown ul { padding-left: 20px; margin: 4px 0; }\n.dps-wiki-markdown a { color: #378ADD; }\n\n.dps-body::-webkit-scrollbar, .dps-tab-body::-webkit-scrollbar { width: 10px; height: 10px; }\n.dps-body::-webkit-scrollbar-thumb, .dps-tab-body::-webkit-scrollbar-thumb { background: var(--dsw-alias-scrollbar-bg-l2); border-radius: 6px; }\n.dps-body::-webkit-scrollbar-thumb:hover, .dps-tab-body::-webkit-scrollbar-thumb:hover { background: var(--dsw-alias-scrollbar-hover-l2); }\n\n/* ---- 0.1.3 insights: right details-column panel ---- */\n.dps-ins { display: flex; flex-direction: column; height: 100%; min-width: 0; }\n.dps-ins-head { padding: 10px 12px 0; border-bottom: 1px solid var(--dsw-alias-border-l2); }\n.dps-ins-tabs { display: flex; gap: 4px; }\n.dps-ins-tab {\n  appearance: none; border: none; background: transparent; cursor: pointer;\n  font-size: 13px; color: var(--dsw-alias-label-secondary);\n  padding: 6px 12px; border-radius: 8px 8px 0 0; position: relative;\n}\n.dps-ins-tab:hover { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-ins-tab.on { color: var(--dsw-alias-label-primary); font-weight: 500; }\n.dps-ins-tab.on::after { content: ''; position: absolute; left: 10px; right: 10px; bottom: -1px; height: 2px; background: var(--dsw-alias-label-primary); border-radius: 1px; }\n.dps-ins-badge {\n  display: inline-block; min-width: 16px; margin-left: 6px; padding: 0 4px;\n  font-size: 11px; line-height: 16px; text-align: center; border-radius: 8px;\n  background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-secondary);\n}\n.dps-ins-body { flex: 1; overflow-y: auto; padding: 12px; }\n.dps-ins-tab-body { display: flex; flex-direction: column; gap: 12px; }\n.dps-ins-empty { color: var(--dsw-alias-label-tertiary); font-size: 13px; padding: 24px 8px; text-align: center; }\n.dps-ins-empty p { margin: 4px 0; }\n\n/* ---- 0.1.3 insights: \u7528\u91CF\u89C6\u56FE tab\uFF08\u4E0E\u5BF9\u8BDD/\u8F68\u8FF9\u5E76\u6392\uFF09---- */\n.dps-usage { padding: 20px; }\n/* summary cards */\n.dps-ins-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }\n.dps-ins-card {\n  display: flex; flex-direction: column; gap: 2px; padding: 10px;\n  border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px;\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.dps-ins-card-label { font-size: 11px; color: var(--dsw-alias-label-tertiary); }\n.dps-ins-card-value { font-size: 15px; font-weight: 500; color: var(--dsw-alias-label-primary); font-variant-numeric: tabular-nums; }\n\n/* chart */\n.dps-ins-chart-wrap { position: relative; }\n.dps-ins-chart { width: 100%; height: auto; display: block; border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; background: var(--dsw-alias-interactive-bg-hover); }\n.dps-ins-chart-hint {\n  position: absolute; top: 8px; left: 50%; transform: translateX(-50%);\n  font-size: 11px; color: var(--dsw-alias-label-secondary);\n  background: color-mix(in srgb, var(--dsw-alias-interactive-bg-hover) 85%, transparent);\n  border: 1px solid var(--dsw-alias-border-l2); border-radius: 999px; padding: 2px 10px;\n  pointer-events: none; white-space: nowrap;\n}\n.dps-ins-legend { display: flex; flex-wrap: wrap; gap: 8px 12px; font-size: 11px; color: var(--dsw-alias-label-secondary); }\n.dps-ins-legend-item { display: inline-flex; align-items: center; gap: 4px; }\n.dps-ins-legend-item i { width: 9px; height: 9px; border-radius: 2px; display: inline-block; }\n\n/* meta / model mix */\n.dps-ins-meta { font-size: 12px; color: var(--dsw-alias-label-secondary); border-top: 1px solid var(--dsw-alias-border-l2); padding-top: 10px; display: flex; flex-direction: column; gap: 6px; }\n.dps-ins-meta-title { font-weight: 500; color: var(--dsw-alias-label-primary); font-size: 12px; }\n.dps-ins-meta-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; }\n.dps-ins-meta-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dps-ins-warn { font-size: 11px; color: #b87517; background: rgba(186, 117, 23, .1); border-radius: 6px; padding: 6px 8px; }\n\n/* header toggle button */\n.dps-ins-toggle {\n  appearance: none; border: 1px solid var(--dsw-alias-border-l2); background: transparent;\n  width: 26px; height: 26px; border-radius: 7px; cursor: pointer;\n  display: inline-flex; align-items: center; justify-content: center; color: var(--dsw-alias-label-secondary);\n}\n.dps-ins-toggle:hover { background: var(--dsw-alias-interactive-bg-hover); }\n.dps-ins-toggle.on { border-color: var(--dsw-alias-label-primary); }\n\n/* jobs timeline */\n.dps-ins-timeline { display: flex; flex-direction: column; }\n.dps-job { display: flex; gap: 10px; }\n.dps-job-rail { position: relative; width: 10px; flex: none; display: flex; justify-content: center; }\n.dps-job-dot { width: 9px; height: 9px; border-radius: 50%; margin-top: 5px; flex: none; }\n.dps-job-line { position: absolute; top: 16px; bottom: -4px; width: 2px; background: var(--dsw-alias-border-l2); border-radius: 1px; }\n.dps-job-card { flex: 1; min-width: 0; padding: 8px 10px; margin-bottom: 10px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; display: flex; flex-direction: column; gap: 4px; }\n.dps-job-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }\n.dps-job-id { font-size: 11px; color: var(--dsw-alias-label-tertiary); font-family: var(--font-mono, monospace); }\n.dps-job-status { font-size: 11px; font-weight: 500; }\n.dps-job-label { font-size: 13px; color: var(--dsw-alias-label-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dps-job-detail { font-size: 11px; color: var(--dsw-alias-label-tertiary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dps-job-meta { display: flex; justify-content: space-between; }\n";

		// src/client/index.tsx
		var import_jsx_runtime8 = require("react/jsx-runtime");
		if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="dsh-plugin-hub/store.css"]') === null) {
		  const tag = document.createElement("style");
		  tag.dataset.plugin = "dsh-plugin-hub";
		  tag.dataset.pluginCss = "dsh-plugin-hub/store.css";
		  tag.textContent = store_default;
		  document.head.appendChild(tag);
		}
		var NS = "pluginStore";
		var zh = {
		  "entry.label": "\u63D2\u4EF6\u5546\u5E97",
		  "entry.tooltip": "\u6253\u5F00\u63D2\u4EF6\u5546\u5E97\uFF1A\u6D4F\u89C8\u3001\u641C\u7D22\u3001\u4E00\u952E\u5B89\u88C5 DSH \u63D2\u4EF6",
		  "settings.nav": "\u63D2\u4EF6\u5546\u5E97",
		  "discover.search": "\u6309\u540D\u79F0\u6216\u63CF\u8FF0\u641C\u7D22\u63D2\u4EF6\u2026",
		  "discover.empty": "\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u63D2\u4EF6",
		  "discover.emptyHint": "\u63D0\u793A\uFF1A\u9996\u6B21\u4F7F\u7528\u8BF7\u5148\u524D\u5F80\u300C\u8BBE\u7F6E\u300D\u9875\u70B9\u51FB\u300C\u7ACB\u5373\u540C\u6B65\u300D\uFF0C\u5C06 GitHub \u4E0A\u7684 dsh-plugin \u4ED3\u5E93\u955C\u50CF\u5230\u672C\u5730\u6570\u636E\u5E93\u3002",
		  "settings.open": "\u6253\u5F00\u63D2\u4EF6\u5546\u5E97",
		  // ---- framework copy (0.1.4: follow dsh locale) ----
		  "nav.discover": "\u53D1\u73B0\u63D2\u4EF6",
		  "nav.wiki": "\u767E\u79D1",
		  "nav.skill": "Skill \u5546\u5E97",
		  "nav.installed": "\u5DF2\u5B89\u88C5",
		  "nav.health": "\u5065\u5EB7\u5EA6",
		  "nav.publish": "\u53D1\u5E03",
		  // ---- trust ----
		  "trust.official": "\u5B98\u65B9",
		  "trust.verified": "\u8BA4\u8BC1",
		  "trust.community": "\u793E\u533A",
		  "trust.unreviewed": "\u672A\u5BA1\u6838",
		  "trust.sourceHint": "\u4FE1\u4EFB\u5206\u5C42\u6765\u81EA\u793E\u533A\u7D22\u5F15 dsh-hub-index\uFF08official/verified/community/unreviewed\uFF09",
		  "nav.scaffold": "\u5F00\u53D1\u811A\u624B\u67B6",
		  "nav.audit": "\u5BA1\u8BA1\u65E5\u5FD7",
		  "nav.settings": "\u8BBE\u7F6E",
		  // ---- issues ----
		  "issues.desc": "\u6765\u81EA\u8BE5\u63D2\u4EF6 GitHub \u4ED3\u5E93\u7684\u516C\u5F00\u8BA8\u8BBA\uFF08\u53EA\u8BFB\uFF0C\u70B9\u51FB\u8DF3\u8F6C GitHub \u53C2\u4E0E\u8BA8\u8BBA\uFF09\uFF1A",
		  "issues.openBoard": "\u6253\u5F00\u5168\u90E8\u8BA8\u8BBA",
		  "issues.loading": "\u52A0\u8F7D GitHub \u8BA8\u8BBA\u4E2D\u2026",
		  "issues.empty": "\u8BE5\u4ED3\u5E93\u6682\u65E0 issue / PR \u8BA8\u8BBA\uFF0C\u6216\u8005\u6CA1\u6709 GitHub \u4ED3\u5E93\u3002",
		  // ---- health hub ----
		  "health.title": "\u5065\u5EB7\u5EA6\u6392\u884C\u699C",
		  "health.desc": "\u6309\u5065\u5EB7\u6307\u6570\u6392\u5E8F\u7684 Top 20\uFF0C\u6BCF\u65E5\u81EA\u52A8\u66F4\u65B0\u3002\u70B9\u51FB\u4EFB\u610F\u63D2\u4EF6\u67E5\u770B\u8BC4\u5206\u6784\u6210\u4E0E\u52A8\u6001\u56FE\u8868\u3002",
		  "health.updatedAt": "\u66F4\u65B0\u4E8E",
		  "health.healthy": "\u5065\u5EB7",
		  "health.attention": "\u9700\u5173\u6CE8",
		  "health.stale": "\u5DF2\u505C\u6EDE",
		  "health.avg": "\u5E73\u5747\u5206",
		  "health.loading": "\u8BA1\u7B97\u5065\u5EB7\u5EA6\u4E2D\u2026",
		  "health.empty": "\u6682\u65E0\u63D2\u4EF6\u6570\u636E\uFF0C\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u540C\u6B65\u955C\u50CF\u3002",
		  "health.lastUpdate": "\u6700\u540E\u66F4\u65B0",
		  "health.downloads": "\u4E0B\u8F7D",
		  "health.openIssues": "\u5F00\u653E\u95EE\u9898",
		  "health.breakdown": "\u8BC4\u5206\u6784\u6210",
		  "health.act": "\u6D3B\u8DC3\u5EA6",
		  "health.dist": "\u53D1\u5E03\u6E20\u9053",
		  "health.bugs": "Bug \u4FE1\u53F7",
		  "health.comm": "\u793E\u533A\u89C4\u6A21",
		  "health.rel": "\u7248\u672C\u8282\u594F",
		  "health.timeline": "\u6700\u8FD1\u52A8\u6001",
		  "health.timelineHint": "\u65F6\u95F4\u8F74\uFF1A\u91D1\u8272\u7AD6\u7EBF\u4E3A\u7248\u672C\u53D1\u5E03\u8282\u70B9\uFF08\u9876\u90E8\u6807\u7248\u672C\u53F7\uFF09\uFF0C\u84DD\u8272\u6298\u7EBF\u4E3A npm \u6BCF\u65E5\u771F\u5B9E\u4E0B\u8F7D\u91CF\uFF08\u65E0\u63D2\u503C\uFF09\u3002\u6EDA\u8F6E\u7F29\u653E\u3001\u62D6\u62FD\u5E73\u79FB\u3001\u53CC\u51FB\u590D\u4F4D\u3002",
		  "health.axisDownloads": "\u4E0B\u8F7D/\u65E5",
		  "health.noData": "\u6682\u65E0\u52A8\u6001\u6570\u636E",
		  "health.noDetail": "\u6682\u65E0\u5065\u5EB7\u6570\u636E\uFF08\u8BE5\u63D2\u4EF6\u53EF\u80FD\u6CA1\u6709 GitHub \u4ED3\u5E93\uFF09\u3002",
		  "health.changeTrend": "\u66F4\u65B0\u53D8\u52A8\u8D8B\u52BF",
		  "health.changeTrendHint": "\u84DD\u8272\u6298\u7EBF\u4E3A\u6BCF\u65E5\u4EE3\u7801\u63D0\u4EA4\u9891\u6B21\uFF08\u8FD1 60 \u5929\uFF09\uFF0C\u91D1\u8272\u6298\u7EBF\u4E3A\u6BCF\u65E5\u52A0\u661F\u589E\u91CF\uFF08\u8FD1 100 \u6761\u661F\u6807\uFF09\uFF1B\u6EDA\u8F6E\u7F29\u653E\u3001\u62D6\u62FD\u5E73\u79FB\u3002",
		  "health.commitsPerDay": "\u6BCF\u65E5\u66F4\u65B0\u9891\u6B21",
		  "health.starsPerDay": "\u6BCF\u65E5\u52A0\u661F",
		  "health.starsNeedToken": "\u52A0\u661F\u8D8B\u52BF\u9700\u8981 GitHub Token\uFF1A\u5728\u300C\u8BBE\u7F6E\u300D\u9875\u914D\u7F6E\u4EE4\u724C\u540E\u5373\u53EF\u663E\u793A\u6BCF\u65E5\u52A0\u661F\u589E\u91CF\uFF08\u672A\u914D\u7F6E\u65F6\u4E0D\u5C55\u793A\uFF09\u3002",
		  // ---- update ----
		  "action.update": "\u66F4\u65B0",
		  "action.updating": "\u66F4\u65B0\u4E2D\u2026",
		  "installed.updateTitle": "\u6709\u65B0\u7248\u672C\u53EF\u7528",
		  // ---- scaffold ----
		  "scaffold.title": "\u63D2\u4EF6\u5F00\u53D1\u811A\u624B\u67B6",
		  "scaffold.desc": "\u60F3\u7ED9\u751F\u6001\u6DFB\u7816\u52A0\u74E6\uFF1F\u6309\u4EE5\u4E0B\u6B65\u9AA4\u521B\u5EFA DSH \u63D2\u4EF6\uFF0C\u672C\u5730\u5B89\u88C5\u540E\u6253\u5F00\u5546\u5E97\u300C\u53D1\u5E03\u300D\u9875\uFF0C\u4E00\u952E\u53D1\u5E03\u5230 GitHub / npm \u2014\u2014 \u5B89\u5168\u626B\u63CF\u901A\u8FC7\u5373\u4E0A\u7EBF\uFF0C\u5168\u751F\u6001\u53EF\u641C\u7D22\u5B89\u88C5\u3002",
		  "scaffold.step1.title": "\u4E86\u89E3\u63D2\u4EF6\u7ED3\u6784",
		  "scaffold.step1.before": "\u4E00\u4E2A DSH \u63D2\u4EF6\u5C31\u662F\u4E00\u4E2A npm \u5305\uFF1Apackage.json \u4E2D\u58F0\u660E ",
		  "scaffold.step1.mid": "\uFF08host \u7AEF Cordis \u5C42\uFF09\u4E0E ",
		  "scaffold.step1.after": "\uFF08\u6D4F\u89C8\u5668\u7AEF UI \u5305\uFF09\u3002\u53EF\u53C2\u8003\u5DF2\u4E0A\u67B6\u7684 ",
		  "scaffold.step1.sameAs": "\uFF08\u672C\u5546\u5E97\u5373\u91C7\u7528\u76F8\u540C\u7ED3\u6784\uFF09\u4EE5\u53CA ",
		  "scaffold.step1.docs": "DeepSeek Harness \u5B98\u65B9\u6587\u6863",
		  "scaffold.step1.tail": "\u3002",
		  "scaffold.step2.title": "\u521B\u5EFA\u5DE5\u7A0B",
		  "scaffold.step2.text": "\u514B\u9686\u6A21\u677F\u6216\u4ECE\u96F6\u521D\u59CB\u5316\uFF0C\u5B9E\u73B0\u529F\u80FD\u540E\u672C\u5730\u8C03\u8BD5\uFF1A",
		  "scaffold.step3.title": "\u53D1\u5E03\u4E0A\u7EBF",
		  "scaffold.step3.text": "\u7528 dsh plugin add \u672C\u5730\u5B89\u88C5\uFF08\u81EA\u52A8\u5F52\u5165\u300C\u81EA\u521B\u4F5C\u63D2\u4EF6\u300D\uFF09\uFF0C\u7136\u540E\u6253\u5F00\u5546\u5E97\u300C\u53D1\u5E03\u300D\u9875\uFF1A\u8F93\u5165 GitHub / npm \u4EE4\u724C \u2192 \u9009\u62E9\u63D2\u4EF6 \u2192 \u586B Markdown \u56FE\u6587\u4ECB\u7ECD \u2192 \u9009\u516C\u5F00/\u79C1\u4EBA + \u6807\u7B7E \u2192 \u4E00\u952E\u53D1\u5E03\u3002\u53D1\u5E03\u524D\u7ECF\u8FC7\u5B89\u5168\u626B\u63CF\uFF08\u9AD8\u98CE\u9669\u81EA\u52A8\u9A73\u56DE\uFF09\uFF0C\u516C\u5F00\u5373\u4E0A\u7EBF\uFF0C\u65E0\u9700\u624B\u52A8\u6253 Topic\u3002",
		  "scaffold.step3.cats": "\u53EF\u7528\u7684\u5206\u7C7B\u6807\u7B7E\uFF1A",
		  "scaffold.step3.catsHint": "\uFF08\u6839\u636E package.json keywords \u4E0E\u4ED3\u5E93 Topics \u81EA\u52A8\u5F52\u7C7B\uFF09",
		  "scaffold.copy": "\u590D\u5236",
		  "scaffold.copyAria": "\u590D\u5236\u547D\u4EE4",
		  "scaffold.linkRepo": "\u5B98\u65B9\u4ED3\u5E93",
		  "scaffold.linkDocs": "\u5F00\u53D1\u6587\u6863",
		  "scaffold.linkEco": "\u6D4F\u89C8\u751F\u6001\u4ED3\u5E93",
		  // ---- detail tabs ----
		  "detail.tab.overview": "\u6982\u89C8",
		  "detail.tab.usage": "\u4F7F\u7528\u8BF4\u660E",
		  "detail.tab.versions": "\u7248\u672C\u5386\u53F2",
		  "detail.tab.graph": "\u4F9D\u8D56\u62D3\u6251",
		  "detail.tab.reviews": "\u8BC4\u4EF7",
		  "detail.tab.issues": "GitHub \u8BA8\u8BBA",
		  "detail.tab.health": "\u5065\u5EB7\u5EA6",
		  "detail.tab.wiki": "\u767E\u79D1",
		  "detail.tab.bench": "\u8DD1\u5206",
		  // ---- bench (dsh-bench 独立项目产出) ----
		  "bench.loading": "\u52A0\u8F7D\u8DD1\u5206\u2026",
		  "bench.runNow": "\u7ACB\u5373\u8DD1\u5206",
		  "bench.running": "\u8DD1\u5206\u4E2D\u2026",
		  "bench.runHint": "\uFF08Mock \u96F6 token / \u7AEF\u5230\u7AEF\u6D88\u8017 token\uFF09",
		  "bench.e2e": "\u7AEF\u5230\u7AEF\u8DD1\u5206",
		  "bench.e2eRunning": "\u7AEF\u5230\u7AEF\u8DD1\u5206\u4E2D\u2026",
		  "bench.e2eConfirm": "\u7AEF\u5230\u7AEF\u8DD1\u5206\u5C06\u6D88\u8017\u4F60\u7684 token\uFF08\u771F\u5B9E\u8C03\u7528\u6A21\u578B\uFF09\u3002\u4E0D\u4FDD\u8BC1\u6D4B\u8BD5\u4E0D\u4F1A\u6B7B\u5FAA\u73AF / \u65E0\u6CD5\u9884\u77E5\u5177\u4F53\u6D88\u8017\uFF1B\u8D85\u65F6 120s \u81EA\u52A8\u4E2D\u6B62\u3002\u786E\u5B9A\u7EE7\u7EED\uFF1F",
		  "bench.noEntry": "\u6682\u65E0\u8BE5\u63D2\u4EF6\u7684\u8DD1\u5206\u6570\u636E",
		  "bench.hint": "\u8DD1\u5206\u7531\u72EC\u7ACB\u9879\u76EE dsh-bench \u4EA7\u51FA\uFF08\u865A\u62DF DSH \u73AF\u5883 L1 \u52A0\u8F7D\u57FA\u51C6\uFF0C\u96F6 token\uFF09\uFF1B\u8FD0\u884C dsh-bench \u540E\u5C06\u62A5\u544A\u653E\u5230\u672C\u673A\u5373\u53EF\u770B\u5230",
		  "bench.score": "\u7EFC\u5408\u6027\u80FD\u5206",
		  "bench.updated": "\u8DD1\u5206\u65F6\u95F4",
		  "bench.ecoAvg": "\u751F\u6001\u5747\u503C",
		  "bench.failed": "\u52A0\u8F7D\u5931\u8D25",
		  "bench.metrics": "\u5404\u73AF\u8282\u8017\u65F6",
		  "bench.wall": "\u542F\u52A8\u603B\u8017\u65F6",
		  "bench.apply": "\u63D2\u4EF6\u52A0\u8F7D",
		  "bench.bundle": "bundle(gzip)",
		  "bench.hooks": "hook \u6570",
		  "bench.note": "\u8DD1\u5206 = \u52A8\u6001\u5B9E\u6D4B\uFF08dsh-bench\uFF09\uFF0C\u5065\u5EB7\u5EA6 = \u9759\u6001\u72B6\u6001\uFF1B\u4E24\u8005\u4E92\u8865\u3002\u5206\u503C\u4E3A\u6279\u5185\u76F8\u5BF9\u5206\uFF0C\u8DE8\u673A\u53EF\u6BD4\u9700\u540C\u673A\u57FA\u7EBF\u3002",
		  // ---- wiki ----
		  "wiki.title": "\u63D2\u4EF6\u767E\u79D1\u5E93",
		  "wiki.desc": "\u4E0D\u77E5\u9053\u67D0\u4E2A\u63D2\u4EF6\u80FD\u5E72\u4EC0\u4E48\u3001\u600E\u4E48\u7528\u3001\u6700\u4F73\u5B9E\u8DF5\u662F\u4EC0\u4E48\uFF1F\u5728\u8FD9\u91CC\u67E5\u2014\u2014\u8986\u76D6\u5546\u5E97\u540C\u6B65\u63D2\u4EF6\u4E0E Blue-Whale \u76EE\u5F55\u6536\u5F55\u7684 1800+ \u4ED3\u5E93\u3002",
		  "wiki.search": "\u641C\u7D22\u63D2\u4EF6\u2026",
		  "wiki.allCat": "\u5168\u90E8\u5206\u7C7B",
		  "wiki.allSource": "\u5168\u90E8\u6765\u6E90",
		  "wiki.srcMirror": "\u5546\u5E97\u540C\u6B65",
		  "wiki.srcCatalog": "\u76EE\u5F55\u6536\u5F55",
		  "wiki.srcCatalogHint": "\u6765\u81EA Blue-Whale-Harness \u793E\u533A\u76EE\u5F55\uFF081812 \u4ED3\u5E93\uFF09\uFF0C\u4EC5\u7D22\u5F15\u672A\u540C\u6B65\u8BE6\u60C5",
		  "wiki.catalogNoDesc": "\u6765\u81EA\u793E\u533A\u76EE\u5F55 Blue-Whale-Harness\uFF0C\u70B9\u51FB\u67E5\u770B GitHub",
		  "wiki.loading": "\u52A0\u8F7D\u767E\u79D1\u4E2D\u2026",
		  "wiki.empty": "\u6CA1\u6709\u5339\u914D\u7684\u767E\u79D1\u6761\u76EE",
		  "wiki.total": "\u5171",
		  "wiki.noEntry": "\u6682\u65E0\u767E\u79D1\u5185\u5BB9",
		  "wiki.install": "\u5B89\u88C5\u65B9\u5F0F",
		  "wiki.installHint": "\uFF08\u5728\u8BE6\u60C5\u9875\u9876\u90E8\u70B9\u300C\u5B89\u88C5\u300D\u5373\u53EF\uFF0C\u8FD9\u91CC\u53EA\u662F\u547D\u4EE4\u5907\u67E5\uFF09",
		  "wiki.what": "\u5B83\u662F\u4EC0\u4E48",
		  "wiki.highlights": "\u5B83\u80FD\u5E72\u4EC0\u4E48 / \u4EF7\u503C\u5728\u54EA",
		  "wiki.howto": "\u600E\u4E48\u7528",
		  "wiki.bestPractices": "\u6700\u4F73\u5B9E\u8DF5 / \u6CE8\u610F\u4E8B\u9879",
		  "wiki.related": "\u76F8\u5173\u63D2\u4EF6",
		  "wiki.latestVer": "\u6700\u65B0\u7248\u672C",
		  "wiki.verCount": "\u7248\u672C",
		  "wiki.deps": "\u4F9D\u8D56",
		  "wiki.homepage": "\u4E3B\u9875",
		  // ---- skill store ----
		  "skill.title": "Skill \u5546\u5E97",
		  "skill.desc": "\u5BF9\u8BDD\u4E2D\u53EF\u8C03\u7528\u7684\u6280\u80FD\uFF08SKILL.md\uFF09\uFF1A\u6D4F\u89C8\u5168\u751F\u6001\u6280\u80FD\uFF08SKILL.md \u662F\u901A\u7528\u683C\u5F0F\uFF0C\u6240\u6709\u5E73\u53F0\u7684\u6280\u80FD\u90FD\u53EF\u7528\uFF09\u2192 \u4E00\u952E\u5B89\u88C5\u5230\u672C\u673A \u2192 \u5BF9\u8BDD\u65F6\u544A\u8BC9 AI\u300C\u7528 xx \u6280\u80FD\u300D\u5373\u53EF\u8C03\u7528\u3002",
		  "skill.install": "\u5B89\u88C5",
		  "skill.uninstall": "\u5378\u8F7D",
		  "skill.installed": "\u5DF2\u5B89\u88C5",
		  "skill.back": "\u8FD4\u56DE\u5217\u8868",
		  "skill.searchPlaceholder": "\u641C\u7D22\u6280\u80FD\u540D\u79F0 / \u63CF\u8FF0 / \u4F5C\u8005\u2026",
		  "skill.total": "\u5171",
		  "skill.loading": "\u52A0\u8F7D\u4E2D\u2026",
		  "skill.empty": "\u8FD8\u6CA1\u6709\u6280\u80FD\uFF0C\u8BD5\u8BD5\u5148\u300C\u7ACB\u5373\u540C\u6B65\u300D",
		  "skill.emptyHint": "\u540C\u6B65\u4F1A\u4ECE GitHub \u5404 skill \u4E3B\u9898\u6536\u96C6\u5168\u751F\u6001\u6280\u80FD",
		  "skill.howToUse": "\u5B89\u88C5\u540E\u5982\u4F55\u8C03\u7528\uFF1A\u91CD\u542F dsh\uFF0C\u7136\u540E\u5728\u5BF9\u8BDD\u4E2D\u5BF9 AI \u8BF4\uFF1A",
		  "skill.howToUseCmd": "\u4F7F\u7528 xxx \u6280\u80FD / use the xxx skill",
		  "skill.source": "\u6765\u6E90:",
		  "skill.path": "\u8DEF\u5F84:",
		  "skill.content": "\u6280\u80FD\u5185\u5BB9\uFF08SKILL.md\uFF09",
		  "skill.platformAll": "\u5168\u5E73\u53F0",
		  "skill.platformDsh": "DSH \u4E13\u7528",
		  "skill.platformGeneral": "\u901A\u7528",
		  // ---- publish view ----
		  "publish.title": "\u4E00\u952E\u53D1\u5E03\u63D2\u4EF6",
		  "publish.desc": "\u628A\u672C\u5730\u5F00\u53D1\u597D\u7684\u63D2\u4EF6\u4E00\u952E\u53D1\u5E03\u5230 GitHub \u4ED3\u5E93\u548C/\u6216 npm\uFF0C\u516C\u5F00\u5373\u4E0A\u7EBF\uFF0C\u5168\u4E16\u754C\u7684 DSH \u7528\u6237\u90FD\u80FD\u901A\u8FC7\u672C\u5546\u5E97\u641C\u7D22\u5E76\u5B89\u88C5\u3002",
		  "publish.stepTarget": "1. \u53D1\u5E03\u76EE\u6807",
		  "publish.target.github": "GitHub \u53D1\u5E03",
		  "publish.target.npm": "npm \u53D1\u5E03",
		  "publish.target.both": "\u4E24\u8005\u90FD\u8981",
		  "publish.stepKeys": "2. API Key",
		  "publish.ghTokenPlaceholder": "GitHub \u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C\uFF08\u9700\u52FE\u9009 repo \u5199\u5165\u6743\u9650\uFF0Cghp_\u2026\uFF09",
		  "publish.npmTokenPlaceholder": "npm \u8BBF\u95EE\u4EE4\u724C\uFF08Automation \u7C7B\u578B\uFF0Cnpm_\u2026\uFF09",
		  "publish.keysHint": "\u51FA\u4E8E\u5B89\u5168\u8003\u8651\uFF0C\u4EE4\u724C\u4EC5\u672C\u6B21\u53D1\u5E03\u4F7F\u7528\u3001\u7EDD\u4E0D\u4FDD\u5B58\uFF1B\u6BCF\u6B21\u53D1\u5E03\u90FD\u9700\u8981\u91CD\u65B0\u8F93\u5165\u3002",
		  "publish.stepPlugin": "3. \u9009\u62E9\u8981\u53D1\u5E03\u7684\u63D2\u4EF6",
		  "publish.loading": "\u52A0\u8F7D\u4E2D\u2026",
		  "publish.noOwn": "\u8FD8\u6CA1\u6709\u53EF\u53D1\u5E03\u7684\u63D2\u4EF6\u3002\u8BF7\u5148\u5728\u300C\u5F00\u53D1\u811A\u624B\u67B6\u300D\u4E2D\u521B\u5EFA\u63D2\u4EF6\u5E76\u7528 dsh plugin add \u672C\u5730\u5B89\u88C5\uFF0C\u5B83\u4F1A\u51FA\u73B0\u5728\u300C\u81EA\u521B\u4F5C\u63D2\u4EF6\u300D\u5206\u7C7B\u3002",
		  "publish.stepInfo": "4. \u53D1\u5E03\u4FE1\u606F",
		  "publish.mdEdit": "\u7F16\u8F91",
		  "publish.mdPreview": "\u9884\u89C8",
		  "publish.mdEmpty": "*\uFF08\u7A7A\u767D\u2014\u2014\u9884\u89C8\u4E3A\u7A7A\uFF09*",
		  "publish.mdHint": "\u652F\u6301 Markdown \u56FE\u6587\uFF1A\u6807\u9898\u3001\u5217\u8868\u3001\u52A0\u7C97\u3001\u4EE3\u7801\u3001\u56FE\u7247\uFF08![\u8BF4\u660E](\u56FE\u7247\u94FE\u63A5)\uFF09\u7B49\u3002",
		  "publish.writeReadme": "\u5C06\u4ECB\u7ECD\u5199\u5165\u4ED3\u5E93 README.md\uFF08\u4EC5\u5F53\u63D2\u4EF6\u76EE\u5F55\u6CA1\u6709 README \u65F6\u751F\u6210\uFF0C\u4E0D\u4F1A\u8986\u76D6\u539F\u6587\u6863\uFF09",
		  "publish.descPlaceholder": "\u63D2\u4EF6\u4ECB\u7ECD\uFF08\u652F\u6301 Markdown \u56FE\u6587\uFF0C\u5C06\u4F5C\u4E3A\u4ED3\u5E93\u63CF\u8FF0\u4E0E Release \u8BF4\u660E\uFF1B\u53EF\u957F\u53EF\u77ED\uFF09",
		  "publish.visibility": "\u53EF\u89C1\u6027\uFF1A",
		  "publish.public": "\u516C\u5F00",
		  "publish.private": "\u79C1\u4EBA",
		  "publish.visibilityHint": "\u4EC5 GitHub \u4ED3\u5E93\u53EF\u89C1\u6027\uFF1Bnpm \u53D1\u5E03\u56FA\u5B9A\u516C\u5F00",
		  "publish.topics": "\u6807\u7B7E\uFF1A",
		  "publish.submit": "\u{1F680} \u4E00\u952E\u53D1\u5E03",
		  "publish.publishing": "\u53D1\u5E03\u4E2D\u2026",
		  "publish.starting": "\u542F\u52A8\u53D1\u5E03\u2026",
		  "publish.errNoPlugin": "\u8BF7\u5148\u9009\u62E9\u4E00\u4E2A\u8981\u53D1\u5E03\u7684\u63D2\u4EF6",
		  "publish.published": "\u5DF2\u53D1\u5E03",
		  "publish.secWarningTitle": "\u26A0\uFE0F \u53D1\u5E03\u6210\u529F\uFF0C\u4F46\u5B89\u5168\u626B\u63CF\u53D1\u73B0\u4EE5\u4E0B\u53EF\u7591\u9879\uFF08\u8BF7\u81EA\u884C\u786E\u8BA4\u65E0\u98CE\u9669\u540E\u518D\u516C\u5F00\u63A8\u5E7F\uFF09\uFF1A",
		  "app.title": "\u63D2\u4EF6\u5546\u5E97",
		  "app.detail": "\u63D2\u4EF6\u8BE6\u60C5",
		  "app.close": "\u5173\u95ED",
		  "action.install": "\u5B89\u88C5",
		  "action.uninstall": "\u5378\u8F7D",
		  "action.enable": "\u542F\u7528",
		  "action.disable": "\u7981\u7528",
		  "action.installing": "\u5B89\u88C5\u4E2D\u2026",
		  // ---- env hint ----
		  "install.envHintTitle": "\u8BE5\u63D2\u4EF6\u5728\u8FD0\u884C\u65F6\u4F1A\u8BFB\u53D6\u4EE5\u4E0B\u73AF\u5883\u53D8\u91CF\uFF08\u8BF7\u6309\u9700\u914D\u7F6E\uFF0C\u5426\u5219\u90E8\u5206\u529F\u80FD\u53EF\u80FD\u4E0D\u53EF\u7528\uFF09\uFF1A",
		  "install.envHintDesc": "\u53EF\u53C2\u8003\u63D2\u4EF6 README \u6216\u6E90\u7801\u786E\u8BA4\u7528\u9014\uFF1B\u914D\u7F6E\u540E\u91CD\u542F DSH \u751F\u6548\u3002",
		  "err.dismiss": "\u77E5\u9053\u4E86",
		  "action.uninstalling": "\u5378\u8F7D\u4E2D\u2026",
		  "action.processing": "\u5904\u7406\u4E2D\u2026",
		  "action.retry": "\u91CD\u8BD5",
		  "state.installed": "\u5DF2\u5B89\u88C5",
		  "state.disabled": "\u5DF2\u7981\u7528",
		  "state.installing": "\u5B89\u88C5\u4E2D",
		  "category.tool": "\u5DE5\u5177",
		  "category.agent": "Agent",
		  "category.ui": "\u754C\u9762\u7F8E\u5316",
		  "category.data": "\u6570\u636E\u5904\u7406",
		  "category.vision": "\u89C6\u89C9\u591A\u6A21\u6001",
		  "category.docs": "\u6587\u6863\u529E\u516C",
		  "category.memory": "\u8BB0\u5FC6\u77E5\u8BC6",
		  "category.usage": "\u6A21\u578B\u7528\u91CF",
		  "category.notify": "\u901A\u77E5\u901A\u8BAF",
		  "category.dev": "\u5F00\u53D1\u7F16\u7801",
		  "category.chat": "\u5BF9\u8BDD\u4F1A\u8BDD",
		  "category.hub": "\u805A\u5408\u8D44\u6E90",
		  "category.hubExt": "\u53EF\u6269\u5C55\u7C7B",
		  "category.other": "\u5176\u4ED6",
		  "category.all": "\u5168\u90E8",
		  "source.npm": "npm \u76F4\u88C5",
		  "source.github": "GitHub \u6E90\u7801",
		  "btn.npmInstall": "npm \u5B89\u88C5",
		  "btn.githubInstall": "GitHub \u5B89\u88C5",
		  "err.detail.toggle": "\u67E5\u770B\u8BE6\u60C5",
		  "err.detail.collapse": "\u6536\u8D77\u8BE6\u60C5",
		  "empty.usage": "\u8FD8\u6CA1\u6709\u7528\u91CF\u6570\u636E",
		  "empty.usageHint": "\u53D1\u9001\u7B2C\u4E00\u6761\u6D88\u606F\u540E\uFF0C\u8FD9\u91CC\u4F1A\u5C55\u793A\u6BCF\u4E2A\u8BF7\u6C42\u7684 token \u4E0E\u7F13\u5B58\u547D\u4E2D\u7387\u3002",
		  "usage.input": "\u8F93\u5165",
		  "usage.output": "\u8F93\u51FA",
		  "usage.hitRate": "\u7F13\u5B58\u547D\u4E2D\u7387",
		  "usage.totalInput": "\u603B\u8F93\u5165",
		  "usage.totalOutput": "\u603B\u8F93\u51FA",
		  "usage.estimatedCost": "\u4F30\u7B97\u8D39\u7528",
		  "usage.modelMix": "\u6A21\u578B\u5206\u5E03",
		  "usage.chartHint": "\u6EDA\u8F6E\u7F29\u653E \xB7 \u62D6\u52A8\u5E73\u79FB \xB7 \u53CC\u51FB\u590D\u4F4D",
		  "usage.tab": "\u7528\u91CF",
		  "sort.random": "\u968F\u673A\u63A8\u8350\uFF08\u9632\u5237\u699C\uFF09",
		  "sort.health": "\u6309\u5065\u5EB7\u5EA6",
		  "sort.stars": "\u6309 Star \u6570",
		  "sort.rating": "\u6309\u8BC4\u5206",
		  "sort.downloads": "\u6309\u4E0B\u8F7D\u91CF",
		  "sort.updated": "\u6309\u6700\u8FD1\u66F4\u65B0",
		  "sort.name": "\u6309\u540D\u79F0",
		  "filter.installedOnly": "\u4EC5\u770B\u5DF2\u5B89\u88C5",
		  "downloads.title": "npm \u4E0A\u6708\u771F\u5B9E\u4E0B\u8F7D\u91CF\uFF08\u672A\u53D1\u5E03\u5219\u65E0\uFF09",
		  "downloads.unknown": "npm \u672A\u67E5\u8BE2\u5230",
		  // ---- installed view ----
		  "installed.title": "\u5DF2\u5B89\u88C5\u63D2\u4EF6",
		  "installed.system": "\u7CFB\u7EDF\u63D2\u4EF6",
		  "installed.ui": "\u754C\u9762\u589E\u5F3A",
		  "installed.download": "\u4E0B\u8F7D\u63D2\u4EF6",
		  "installed.own": "\u81EA\u521B\u4F5C\u63D2\u4EF6",
		  "installed.core": "\u6838\u5FC3\u670D\u52A1",
		  "installed.protected": "\u53D7\u4FDD\u62A4",
		  "installed.unmanaged": "\u672A\u6258\u7BA1",
		  "installed.managed": "\u5DF2\u6258\u7BA1",
		  "installed.partialEnable": "\u90E8\u5206\u542F\u7528",
		  "installed.allEnable": "\u5168\u90E8\u542F\u7528",
		  "installed.coreDesc": "DSH \u8FD0\u884C\u7684\u57FA\u7840\u7EC4\u4EF6\u4E0E\u754C\u9762\u80FD\u529B\uFF08\u53D7\u4FDD\u62A4\u9879\u4E0D\u53EF\u7981\u7528\uFF09",
		  "installed.items": "\u9879",
		  "installed.downloadDesc": "\u901A\u8FC7\u63D2\u4EF6\u5546\u5E97\u5B89\u88C5\u7684\u7B2C\u4E09\u65B9\u63D2\u4EF6",
		  "installed.ownDesc": "\u672C\u5730\u5F00\u53D1\u6216\u6539\u9020\u7684\u63D2\u4EF6\uFF08file:/link: \u5B89\u88C5\uFF0C\u6E90\u7801\u5728\u672C\u673A\uFF1B\u53D1\u5E03\u72B6\u6001\u4EE5\u5FBD\u7AE0\u533A\u5206\uFF09",
		  "installed.group.core": "\u6838\u5FC3\u670D\u52A1",
		  "installed.group.ui": "\u754C\u9762\u589E\u5F3A",
		  "installed.group.tool": "\u5F00\u53D1\u5DE5\u5177",
		  "installed.group.llm": "\u6A21\u578B\u4E0E LLM",
		  "installed.group.agent": "Agent",
		  "installed.group.workflow": "\u5DE5\u4F5C\u6D41",
		  "installed.group.data": "\u6570\u636E\u5904\u7406",
		  "installed.group.notification": "\u901A\u77E5",
		  "installed.group.other": "\u5176\u4ED6",
		  "installed.group.hubExt": "\u53EF\u6269\u5C55\u7C7B",
		  // ---- settings view ----
		  "settings.title": "\u63D2\u4EF6\u5546\u5E97\u8BBE\u7F6E",
		  "settings.operator": "\u64CD\u4F5C\u8005\u8EAB\u4EFD\uFF08\u5BA1\u8BA1\u65E5\u5FD7\u7528\uFF09",
		  "settings.operatorHint": "\u5B89\u88C5\u3001\u5378\u8F7D\u3001\u542F\u7528\u3001\u7981\u7528\u3001\u8BC4\u5206\u7B49\u64CD\u4F5C\u4F1A\u4EE5\u8BE5\u540D\u79F0\u8BB0\u5F55\u5230\u5BA1\u8BA1\u65E5\u5FD7\uFF0C\u6EE1\u8DB3\u4F01\u4E1A\u5408\u89C4\u8FFD\u6EAF\u8981\u6C42\u3002",
		  "settings.anonymous": "anonymous\uFF08\u672A\u8BBE\u7F6E\u663E\u793A\u540D\uFF09",
		  "settings.saveActor": "\u4FDD\u5B58\u663E\u793A\u540D",
		  "settings.githubToken": "GitHub \u79C1\u4EBA Token",
		  "settings.githubTokenHint": "GitHub API \u533F\u540D\u53D7\u9650\uFF0810 \u6B21/\u5206\u949F\u3001\u6838\u5FC3 60 \u6B21/\u5C0F\u65F6\uFF09\u3002\u914D\u7F6E\u79C1\u4EBA Token\uFF08ghp-...\uFF0C\u9700 public_repo \u4ED3\u5E93\u8BFB\u53D6\u6743\u9650\uFF09\u540E\uFF0C\u641C\u7D22\u9650\u9891\u63D0\u5347\u81F3 30 \u6B21/\u5206\u949F\u3001\u6838\u5FC3 5000 \u6B21/\u5C0F\u65F6\uFF0C\u955C\u50CF\u540C\u6B65\u53EF\u5B8C\u6574\u62C9\u53D6\u5168\u90E8\u4ED3\u5E93\u7684\u7248\u672C\u5386\u53F2\u3002Token \u4EC5\u4FDD\u5B58\u5728\u672C\u673A\u6570\u636E\u5E93\uFF0C\u4E0D\u4F1A\u53D1\u9001\u5230\u4EFB\u4F55\u7B2C\u4E09\u65B9\u3002",
		  "settings.tokenPlaceholder": "\u7C98\u8D34 GitHub \u79C1\u4EBA Token",
		  "settings.saveToken": "\u4FDD\u5B58 Token",
		  "settings.mirror": "\u955C\u50CF\u540C\u6B65\uFF08\u672C\u5730\u6570\u636E\u5E93\u7F13\u5B58\uFF09",
		  "settings.mirrorHint": "\u5B9A\u671F\u5C06 GitHub \u4E0A\u6807\u8BB0 topic:dsh-plugin\uFF08\u6216\u5728\u4ED3\u5E93\u63CF\u8FF0\u4E2D\u6807\u6CE8 #dsh-plugin\uFF09\u7684\u4ED3\u5E93\u5143\u6570\u636E\u7F13\u5B58\u5230\u672C\u5730\u6570\u636E\u5E93\uFF0C\u5546\u5E97\u641C\u7D22\u4E0E\u52A0\u8F7D\u4E0D\u518D\u53D7\u7F51\u7EDC\u4E0E\u9650\u9891\u5F71\u54CD\u3002\u81EA\u52A8\u540C\u6B65\u5728\u540E\u53F0\u6267\u884C\uFF0C\u4E0D\u963B\u585E\u754C\u9762\u3002",
		  "settings.syncInterval": "\u81EA\u52A8\u540C\u6B65\u95F4\u9694\uFF08\u5C0F\u65F6\uFF0C0=\u5173\u95ED\uFF09",
		  "settings.savePlan": "\u4FDD\u5B58\u8BA1\u5212",
		  "settings.syncNow": "\u7ACB\u5373\u540C\u6B65",
		  "settings.idle": "\u7A7A\u95F2",
		  "settings.lastSync": "\u4E0A\u6B21\u540C\u6B65",
		  "settings.nextPlan": "\u4E0B\u6B21\u8BA1\u5212",
		  "settings.plugins": "\u4E2A\u4ED3\u5E93",
		  "settings.dbPath": "\u6570\u636E\u5E93\u8DEF\u5F84",
		  "settings.uncached": "\u672A\u67E5\u8BE2",
		  "settings.clearToken": "\u6E05\u9664 Token",
		  "settings.tokenSaved": "Token \u5DF2\u4FDD\u5B58",
		  "settings.tokenCleared": "Token \u5DF2\u6E05\u9664",
		  "settings.planSaved": "\u540C\u6B65\u8BA1\u5212\u5DF2\u4FDD\u5B58",
		  // ---- audit view ----
		  "audit.title": "\u64CD\u4F5C\u5BA1\u8BA1\u65E5\u5FD7",
		  "audit.allActions": "\u5168\u90E8\u64CD\u4F5C",
		  "audit.byActor": "\u6309\u64CD\u4F5C\u8005\u7B5B\u9009",
		  "audit.byTarget": "\u6309\u5BF9\u8C61\u7B5B\u9009",
		  "audit.time": "\u65F6\u95F4",
		  "audit.actor": "\u64CD\u4F5C\u8005",
		  "audit.action": "\u64CD\u4F5C",
		  "audit.target": "\u5BF9\u8C61",
		  "audit.result": "\u7ED3\u679C",
		  "audit.detail": "\u8BE6\u60C5",
		  "audit.ok": "\u6210\u529F",
		  "audit.failed": "\u5931\u8D25",
		  "audit.uninstall": "\u5378\u8F7D",
		  "audit.install": "\u5B89\u88C5",
		  "audit.enable": "\u542F\u7528",
		  "audit.disable": "\u7981\u7528",
		  "audit.rate": "\u8BC4\u5206",
		  "audit.tokenSet": "\u8BBE\u7F6E Token",
		  "audit.tokenClear": "\u6E05\u9664 Token",
		  "audit.sync": "\u955C\u50CF\u540C\u6B65",
		  "audit.scheduleSet": "\u540C\u6B65\u8BA1\u5212"
		};
		var en = {
		  "entry.label": "Plugin Store",
		  "entry.tooltip": "Open the plugin store: browse, search and one-click install DSH plugins",
		  "settings.nav": "Plugin Store",
		  // ---- update ----
		  "action.update": "Update",
		  "action.updating": "Updating\u2026",
		  "installed.updateTitle": "A newer version is available",
		  "issues.desc": "Public discussions from this plugin's GitHub repo (read-only \u2014 click through to GitHub to join in):",
		  "issues.openBoard": "Open all discussions",
		  "issues.loading": "Loading GitHub discussions\u2026",
		  "issues.empty": "No issues / PRs yet, or this plugin has no GitHub repo.",
		  // ---- health hub ----
		  "health.title": "Health Leaderboard",
		  "health.desc": "Top 20 by health score, refreshed daily. Click any plugin for the breakdown and activity charts.",
		  "health.updatedAt": "Updated",
		  "health.healthy": "Healthy",
		  "health.attention": "Attention",
		  "health.stale": "Stale",
		  "health.avg": "Average",
		  "health.loading": "Scoring plugins\u2026",
		  "health.empty": "No plugin data yet \u2014 sync the mirror in Settings first.",
		  "health.lastUpdate": "Last update",
		  "health.downloads": "Downloads",
		  "health.openIssues": "Open issues",
		  "health.breakdown": "Score breakdown",
		  "health.act": "Activity",
		  "health.dist": "Distribution",
		  "health.bugs": "Bug signal",
		  "health.comm": "Community",
		  "health.rel": "Release cadence",
		  "health.timeline": "Recent activity",
		  "health.timelineHint": "Gold bars are release markers (version on top); the blue line is real daily npm downloads (no interpolation). Wheel to zoom, drag to pan.",
		  "health.axisDownloads": "dl/day",
		  "health.noData": "No activity data yet",
		  "health.noDetail": "No health data (this plugin may have no GitHub repo).",
		  "health.changeTrend": "Change trend",
		  "health.changeTrendHint": "Blue: daily commits (60 days). Gold: daily star gains (last 100 stars). Wheel to zoom, drag to pan.",
		  "health.commitsPerDay": "Commits / day",
		  "health.starsPerDay": "Stars / day",
		  "health.starsNeedToken": "Star trend needs a GitHub token: configure one in Settings to see daily star gains (hidden when not configured).",
		  // ---- scaffold ----
		  "scaffold.title": "Plugin Scaffold",
		  "scaffold.desc": 'Want to contribute? Create a DSH plugin, install it locally, then open the store "Publish" page and ship it to GitHub / npm in one click \u2014 public once the security scan passes.',
		  "scaffold.step1.title": "Understand the plugin shape",
		  "scaffold.step1.before": "A DSH plugin is an npm package: package.json declares ",
		  "scaffold.step1.mid": " (host-side Cordis layer) and ",
		  "scaffold.step1.after": " (browser UI bundle). See the published ",
		  "scaffold.step1.sameAs": " (this store uses the same structure), plus the ",
		  "scaffold.step1.docs": "DeepSeek Harness docs",
		  "scaffold.step1.tail": ".",
		  "scaffold.step2.title": "Create the project",
		  "scaffold.step2.text": "Clone a template or init from scratch, then debug locally:",
		  "scaffold.step3.title": "Publish & go live",
		  "scaffold.step3.text": 'Install locally with dsh plugin add (auto-listed under "My plugins"), then open the store "Publish" page: enter GitHub / npm tokens \u2192 pick the plugin \u2192 write a Markdown description \u2192 choose public/private + topics \u2192 publish. A security scan runs first (high-risk is auto-rejected) \u2014 public means live, no manual topic needed.',
		  "scaffold.step3.cats": "Available categories: ",
		  "scaffold.step3.catsHint": "(auto-derived from package.json keywords and repo topics)",
		  "scaffold.copy": "Copy",
		  "scaffold.copyAria": "Copy command",
		  "scaffold.linkRepo": "Official repo",
		  "scaffold.linkDocs": "Docs",
		  "scaffold.linkEco": "Browse ecosystem",
		  // ---- detail tabs ----
		  "detail.tab.overview": "Overview",
		  "detail.tab.usage": "Usage",
		  "detail.tab.versions": "Versions",
		  "detail.tab.graph": "Dependency graph",
		  "detail.tab.reviews": "Reviews",
		  "detail.tab.issues": "GitHub discussions",
		  "detail.tab.health": "Health",
		  "detail.tab.wiki": "Wiki",
		  "detail.tab.bench": "Bench",
		  // ---- bench (from the standalone dsh-bench project) ----
		  "bench.loading": "Loading bench\u2026",
		  "bench.runNow": "Run bench now",
		  "bench.running": "Benchmarking\u2026",
		  "bench.runHint": "(Mock zero-token / E2E uses your tokens)",
		  "bench.e2e": "E2E bench",
		  "bench.e2eRunning": "E2E benchmarking\u2026",
		  "bench.e2eConfirm": "E2E bench will consume your tokens (real model calls). It is not guaranteed to avoid infinite loops / exact cost is unknown; auto-abort after 120s. Continue?",
		  "bench.noEntry": "No bench data for this plugin yet",
		  "bench.hint": "Bench is produced by the standalone dsh-bench project (virtual DSH L1 load bench, zero token); place its report locally to see scores here",
		  "bench.score": "Performance score",
		  "bench.updated": "Bench time",
		  "bench.ecoAvg": "Ecosystem avg",
		  "bench.failed": "Load failed",
		  "bench.metrics": "Stage timings",
		  "bench.wall": "Boot wall",
		  "bench.apply": "Plugin load",
		  "bench.bundle": "Bundle (gzip)",
		  "bench.hooks": "Hooks",
		  "bench.note": "Bench = dynamic measurement (dsh-bench); health = static state; they complement each other. Scores are batch-relative; cross-machine comparison needs the same-machine baseline.",
		  // ---- wiki ----
		  "wiki.title": "Plugin Wiki",
		  "wiki.desc": "What does a plugin do? How to use it? Best practices? Look it up here \u2014 covers mirrored plugins plus 1800+ repos from the Blue-Whale catalog.",
		  "wiki.search": "Search plugins\u2026",
		  "wiki.allCat": "All categories",
		  "wiki.allSource": "All sources",
		  "wiki.srcMirror": "Mirrored",
		  "wiki.srcCatalog": "Catalog",
		  "wiki.srcCatalogHint": "From the Blue-Whale-Harness community catalog (1812 repos), index-only without details",
		  "wiki.catalogNoDesc": "From the Blue-Whale-Harness community catalog \u2014 open GitHub for details",
		  "wiki.loading": "Loading wiki\u2026",
		  "wiki.empty": "No matching entries",
		  "wiki.total": "Total",
		  "wiki.noEntry": "No wiki content yet",
		  "wiki.install": "Install (optional)",
		  "wiki.installHint": "(hit Install at the top of the detail page \u2014 commands here are for reference)",
		  "wiki.what": "What it is",
		  "wiki.highlights": "What it does / why it matters",
		  "wiki.howto": "How to use",
		  "wiki.bestPractices": "Best practices / notes",
		  "wiki.related": "Related plugins",
		  "wiki.latestVer": "Latest",
		  "wiki.verCount": "Versions",
		  "wiki.deps": "Deps",
		  "wiki.homepage": "Homepage",
		  // ---- skill store ----
		  "skill.title": "Skill Store",
		  "skill.desc": 'Conversation-callable skills (SKILL.md): browse the whole ecosystem (SKILL.md is a universal format \u2014 skills from any platform work in dsh) \u2192 one-click install \u2192 then tell the AI "use the xx skill" in chat.',
		  "skill.install": "Install",
		  "skill.uninstall": "Uninstall",
		  "skill.installed": "Installed",
		  "skill.back": "Back to list",
		  "skill.searchPlaceholder": "Search skills by name / description / author\u2026",
		  "skill.total": "Total",
		  "skill.loading": "Loading\u2026",
		  "skill.empty": 'No skills yet \u2014 try "Sync now" first',
		  "skill.emptyHint": "Sync collects skills from GitHub skill topics",
		  "skill.howToUse": "After install, restart dsh and tell the AI in chat:",
		  "skill.howToUseCmd": "use the xxx skill",
		  "skill.source": "Source:",
		  "skill.path": "Path:",
		  "skill.content": "Skill content (SKILL.md)",
		  "skill.platformAll": "All platforms",
		  "skill.platformDsh": "DSH-native",
		  "skill.platformGeneral": "General",
		  "discover.search": "Search plugins by name or description\u2026",
		  "discover.empty": "No plugins match your query",
		  "discover.emptyHint": "Tip: on first use, open Settings and click \u201CSync now\u201D to mirror GitHub dsh-plugin repositories into the local database.",
		  "settings.open": "Open plugin store",
		  // ---- framework copy ----
		  "nav.discover": "Discover",
		  "nav.wiki": "Wiki",
		  "nav.skill": "Skills",
		  "nav.installed": "Installed",
		  "nav.health": "Health",
		  "nav.publish": "Publish",
		  // ---- trust ----
		  "trust.official": "Official",
		  "trust.verified": "Verified",
		  "trust.community": "Community",
		  "trust.unreviewed": "Unreviewed",
		  "trust.sourceHint": "Trust level from the dsh-hub-index community index (official/verified/community/unreviewed)",
		  "nav.scaffold": "Scaffold",
		  "nav.audit": "Audit",
		  "nav.settings": "Settings",
		  // ---- publish view ----
		  "publish.title": "One-click Publish",
		  "publish.desc": "Publish your locally-developed plugin to GitHub and/or npm in one click. Public = live: every DSH user worldwide can find and install it from this store.",
		  "publish.stepTarget": "1. Target",
		  "publish.target.github": "GitHub",
		  "publish.target.npm": "npm",
		  "publish.target.both": "Both",
		  "publish.stepKeys": "2. API Key",
		  "publish.ghTokenPlaceholder": "GitHub personal access token (needs repo write scope, ghp_\u2026)",
		  "publish.npmTokenPlaceholder": "npm access token (Automation type, npm_\u2026)",
		  "publish.keysHint": "For security, tokens are used for this publish only and are never stored \u2014 re-enter them every time.",
		  "publish.stepPlugin": "3. Pick your plugin",
		  "publish.loading": "Loading\u2026",
		  "publish.noOwn": "No publishable plugins yet. Create one under \u201CScaffold\u201D and install it locally with dsh plugin add \u2014 it will show up here.",
		  "publish.stepInfo": "4. Publish info",
		  "publish.mdEdit": "Edit",
		  "publish.mdPreview": "Preview",
		  "publish.mdEmpty": "*\uFF08empty \u2014 nothing to preview\uFF09*",
		  "publish.mdHint": "Markdown with images supported: headings, lists, bold, code, images (![alt](image-url)).",
		  "publish.writeReadme": "Write this description into the repo README.md (only generated when the plugin has no README; existing docs are never overwritten)",
		  "publish.descPlaceholder": "Plugin description (Markdown with images supported; becomes the repo description & release notes)",
		  "publish.visibility": "Visibility:",
		  "publish.public": "Public",
		  "publish.private": "Private",
		  "publish.visibilityHint": "GitHub repo visibility only; npm publishing is always public",
		  "publish.topics": "Topics:",
		  "publish.submit": "\u{1F680} Publish",
		  "publish.publishing": "Publishing\u2026",
		  "publish.starting": "Starting\u2026",
		  "publish.errNoPlugin": "Pick a plugin to publish first",
		  "publish.published": "published",
		  "publish.secWarningTitle": "\u26A0\uFE0F Published, but the security scan flagged the following (verify they are safe before promoting):",
		  "app.title": "Plugin Store",
		  "app.detail": "Plugin Detail",
		  "app.close": "Close",
		  "action.install": "Install",
		  "action.uninstall": "Uninstall",
		  "action.enable": "Enable",
		  "action.disable": "Disable",
		  "action.installing": "Installing\u2026",
		  // ---- env hint ----
		  "install.envHintTitle": "This plugin reads these environment variables at runtime (configure them if needed, or some features may not work):",
		  "install.envHintDesc": "See the plugin README / source for details; restart DSH after configuring.",
		  "err.dismiss": "Got it",
		  "action.uninstalling": "Uninstalling\u2026",
		  "action.processing": "Processing\u2026",
		  "action.retry": "Retry",
		  "state.installed": "Installed",
		  "state.disabled": "Disabled",
		  "state.installing": "Installing",
		  "category.tool": "Tools",
		  "category.agent": "Agent",
		  "category.ui": "UI & Themes",
		  "category.data": "Data",
		  "category.vision": "Vision & Media",
		  "category.docs": "Docs & Office",
		  "category.memory": "Memory & Knowledge",
		  "category.usage": "Usage & Cost",
		  "category.notify": "Notify & Messaging",
		  "category.dev": "Dev & Coding",
		  "category.chat": "Chat & Session",
		  "category.hub": "Hub & Registry",
		  "category.hubExt": "Hub Extensions",
		  "category.other": "Other",
		  "category.all": "All",
		  "source.npm": "npm",
		  "source.github": "GitHub",
		  "btn.npmInstall": "Install via npm",
		  "btn.githubInstall": "Install via GitHub",
		  "err.detail.toggle": "Details",
		  "err.detail.collapse": "Collapse",
		  "empty.usage": "No usage data yet",
		  "empty.usageHint": "Send a message to see per-request tokens and cache hit rate here.",
		  "usage.input": "Input",
		  "usage.output": "Output",
		  "usage.hitRate": "Cache hit rate",
		  "usage.totalInput": "Total input",
		  "usage.totalOutput": "Total output",
		  "usage.estimatedCost": "Est. cost",
		  "usage.modelMix": "Model mix",
		  "usage.chartHint": "Wheel to zoom \xB7 drag to pan \xB7 double-click to reset",
		  "usage.tab": "Usage",
		  "sort.random": "Random (anti-gaming)",
		  "sort.health": "Health",
		  "sort.stars": "Stars",
		  "sort.rating": "Rating",
		  "sort.downloads": "Downloads",
		  "sort.updated": "Recently updated",
		  "sort.name": "Name",
		  "filter.installedOnly": "Installed only",
		  "downloads.title": "Real npm monthly downloads (none if unpublished)",
		  "downloads.unknown": "npm n/a",
		  // ---- installed view ----
		  "installed.title": "Installed plugins",
		  "installed.system": "System plugins",
		  "installed.ui": "UI extensions",
		  "installed.download": "Downloaded plugins",
		  "installed.own": "Self-made plugins",
		  "installed.core": "Core",
		  "installed.protected": "Protected",
		  "installed.unmanaged": "Unmanaged",
		  "installed.managed": "Managed",
		  "installed.partialEnable": "Partial",
		  "installed.allEnable": "Enable all",
		  "installed.coreDesc": "DSH foundation components and UI capabilities (protected items cannot be disabled)",
		  "installed.items": "items",
		  "installed.downloadDesc": "Third-party plugins installed via the store",
		  "installed.ownDesc": "Self-developed or modified plugins (file:/link: install; source on this machine; publish state via badge)",
		  "installed.group.core": "Core",
		  "installed.group.ui": "UI",
		  "installed.group.tool": "Tools",
		  "installed.group.llm": "Models & LLM",
		  "installed.group.agent": "Agent",
		  "installed.group.workflow": "Workflow",
		  "installed.group.data": "Data",
		  "installed.group.notification": "Notifications",
		  "installed.group.other": "Other",
		  "installed.group.hubExt": "Hub Extensions",
		  // ---- settings view ----
		  "settings.title": "Plugin Store Settings",
		  "settings.operator": "Operator identity (used in audit log)",
		  "settings.operatorHint": "Install, uninstall, enable, disable, rate and other actions are recorded under this name in the audit log to meet enterprise compliance traceability.",
		  "settings.anonymous": "anonymous (no display name set)",
		  "settings.saveActor": "Save name",
		  "settings.githubToken": "GitHub personal token",
		  "settings.githubTokenHint": "GitHub API anonymous is rate-limited (10/min, core 60/hr). Configure a personal token (ghp-... with public_repo read scope) to raise the limits to 30/min and 5000/hr, and mirror sync can pull the full version history of every repository. The token is stored only in your local database and never sent to any third party.",
		  "settings.tokenPlaceholder": "Paste GitHub personal token",
		  "settings.saveToken": "Save token",
		  "settings.mirror": "Mirror sync (local database cache)",
		  "settings.mirrorHint": "Periodically cache the metadata of GitHub repositories tagged topic:dsh-plugin (or marked #dsh-plugin in description) to the local database, so store search and loading are no longer affected by network and rate limits. Auto sync runs in the background without blocking the UI.",
		  "settings.syncInterval": "Auto sync interval (hours, 0=disable)",
		  "settings.savePlan": "Save plan",
		  "settings.syncNow": "Sync now",
		  "settings.idle": "idle",
		  "settings.lastSync": "Last sync",
		  "settings.nextPlan": "Next plan",
		  "settings.plugins": "repositories",
		  "settings.dbPath": "Database path",
		  "settings.uncached": "Not queried",
		  "settings.clearToken": "Clear token",
		  "settings.tokenSaved": "Token saved",
		  "settings.tokenCleared": "Token cleared",
		  "settings.planSaved": "Sync plan saved",
		  // ---- audit view ----
		  "audit.title": "Audit log",
		  "audit.allActions": "All actions",
		  "audit.byActor": "Filter by actor",
		  "audit.byTarget": "Filter by target",
		  "audit.time": "Time",
		  "audit.actor": "Actor",
		  "audit.action": "Action",
		  "audit.target": "Target",
		  "audit.result": "Result",
		  "audit.detail": "Detail",
		  "audit.ok": "Success",
		  "audit.failed": "Failed",
		  "audit.uninstall": "Uninstall",
		  "audit.install": "Install",
		  "audit.enable": "Enable",
		  "audit.disable": "Disable",
		  "audit.rate": "Rate",
		  "audit.tokenSet": "Set token",
		  "audit.tokenClear": "Clear token",
		  "audit.sync": "Mirror sync",
		  "audit.scheduleSet": "Sync plan"
		};
		var inject = ["slots", "locale", "remote"];
		function useOpenStore() {
		  return (0, import_react8.useSyncExternalStore)(openStoreStore.subscribe, openStoreStore.getSnapshot, openStoreStore.getSnapshot);
		}
		function StoreEntryButton({ wide, api, t }) {
		  const open = useOpenStore();
		  const button = /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
		    "button",
		    {
		      type: "button",
		      className: `dps-entry${wide ? "" : " dps-entry-rail"}`,
		      "aria-label": t("entry.label"),
		      onClick: openStore,
		      children: [
		        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_dsh_client_ui_primitives4.IconCordisPluginOutline14, { size: wide ? 14 : 18 }),
		        wide && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "dps-entry-label", children: t("entry.label") })
		      ]
		    }
		  );
		  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
		    wide ? button : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_dsh_client_ui_primitives4.Tooltip, { label: t("entry.label"), delayMs: 500, children: button }),
		    open && (0, import_react_dom2.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime8.jsx)(StoreApp, { api, t }), document.body)
		  ] });
		}
		async function apply(ctx) {
		  const disposeRemote = await ctx.remote.$mount(TYPERT_REMOTE);
		  const disposeLocale = ctx.locale.register(NS, { zh, en });
		  const feature = ctx.inject(["remote.pluginStore"], (scope) => {
		    const api = makeApi(scope.remote);
		    const t = ctx.locale.bind(NS);
		    scope.slots.inject("sidebar.footer.action", () => scope.slots.register({
		      name: "sidebar.footer.action",
		      id: "plugin-store",
		      order: 10,
		      label: () => t("entry.label"),
		      locale: NS,
		      inject: () => ({ api, t })
		    }, StoreEntryButton));
		    scope.slots.inject("settings.section", () => scope.slots.register({
		      name: "settings.section",
		      id: "plugin-store",
		      order: 20,
		      label: () => zh["settings.nav"],
		      locale: NS,
		      inject: () => ({ api, openStore })
		    }, StoreSettingsSection));
		    scope.slots.inject("conversation.view", () => scope.slots.register({
		      name: "conversation.view",
		      id: "plugin-store-usage",
		      order: 15,
		      locale: NS,
		      label: () => t("usage.tab"),
		      inject: (sessionId) => ({ sessionId, t })
		    }, InsightsUsageView));
		    return () => {
		    };
		  });
		  return async () => {
		    await feature.dispose();
		    disposeLocale();
		    await disposeRemote();
		  };
		}
		var index_default = { apply, inject };
		//# sourceMappingURL=client-body.js.map

		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
