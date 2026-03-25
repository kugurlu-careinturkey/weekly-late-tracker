import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'late_entries.create': { paramsTuple?: []; params?: {} }
    'late_entries.store': { paramsTuple?: []; params?: {} }
    'departments.create': { paramsTuple?: []; params?: {} }
    'departments.store': { paramsTuple?: []; params?: {} }
    'late_entries.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'late_entries.create': { paramsTuple?: []; params?: {} }
    'departments.create': { paramsTuple?: []; params?: {} }
    'late_entries.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'late_entries.create': { paramsTuple?: []; params?: {} }
    'departments.create': { paramsTuple?: []; params?: {} }
    'late_entries.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'users.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'late_entries.store': { paramsTuple?: []; params?: {} }
    'departments.store': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}