import {
  pgTable,
  text,
  real,
  timestamp,
  jsonb,
  boolean,
  serial,
  time,
} from "drizzle-orm/pg-core";

export const s_node_properties = pgTable("s_node_properties", {
  deveui: text("deveui").primaryKey(),
  nwskey: text("nwskey").notNull(),
  apskey: text("apskey").notNull(),
  name: text("name").notNull(),
  lat: real("lat").default(14.844598),
  lng: real("lng").default(99.794765),
});

export const c_node_properties = pgTable("c_node_properties", {
  deveui: text("deveui").primaryKey(),
  nwskey: text("nwskey").notNull(),
  apskey: text("apskey").notNull(),
  name: text("name").notNull(),
  lat: real("lat").default(14.844598),
  lng: real("lng").default(99.794765),
  last_interact: timestamp("last_interact"),
  control_status: boolean("control_status").default(false),
});

export const s_node_datas = pgTable("s_node_datas", {
  index: serial("index").primaryKey(),
  deveui: text("deveui").notNull(),
  timestamp: timestamp("timestamp"),
  timestamp_arrive: timestamp("timestamp_arrive").defaultNow(),
  moisture20: real("moisture20").default(-1.0),
  moisture40: real("moisture40").default(-1.0),
  temperature_underground: real("temperature_underground").default(-1.0),
  moisture20_raw: real("moisture20_raw").default(-1.0),
  moisture40_raw: real("moisture40_raw").default(-1.0),
  temperature_underground_raw: real("temperature_underground_raw").default(
    -1.0,
  ),
  temperature: real("temperature").default(-1.0),
  humidity: real("humidity").default(-1.0),
  battery: real("battery").default(-1.0),
  battery_raw: real("battery_raw").default(-1.0),
});

export const c_schedules = pgTable("c_schedules", {
  index: serial("index").primaryKey(),
  node: jsonb("node").default([]),
  day: jsonb("day").default([]),
  time_on: time("time_on"), //format hh:mm
  time_off: time("time_off"), //format hh:mm
});
