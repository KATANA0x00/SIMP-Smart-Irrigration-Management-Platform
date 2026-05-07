CREATE TABLE "c_node_properties" (
	"deveui" text PRIMARY KEY NOT NULL,
	"nwskey" text NOT NULL,
	"apskey" text NOT NULL,
	"name" text NOT NULL,
	"lat" real DEFAULT 14.844598,
	"lng" real DEFAULT 99.794765,
	"last_interact" timestamp,
	"control_status" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "c_schedules" (
	"index" serial PRIMARY KEY NOT NULL,
	"node" jsonb DEFAULT '[]'::jsonb,
	"day" jsonb DEFAULT '[]'::jsonb,
	"time_on" time,
	"time_off" time
);
--> statement-breakpoint
CREATE TABLE "s_node_datas" (
	"index" serial PRIMARY KEY NOT NULL,
	"deveui" text NOT NULL,
	"timestamp" timestamp,
	"timestamp_arrive" timestamp DEFAULT now(),
	"moisture20" real DEFAULT -1,
	"moisture40" real DEFAULT -1,
	"temperature_underground" real DEFAULT -1,
	"moisture20_raw" real DEFAULT -1,
	"moisture40_raw" real DEFAULT -1,
	"temperature_underground_raw" real DEFAULT -1,
	"temperature" real DEFAULT -1,
	"humidity" real DEFAULT -1,
	"battery" real DEFAULT -1,
	"battery_raw" real DEFAULT -1
);
--> statement-breakpoint
CREATE TABLE "s_node_properties" (
	"deveui" text PRIMARY KEY NOT NULL,
	"nwskey" text NOT NULL,
	"apskey" text NOT NULL,
	"name" text NOT NULL,
	"lat" real DEFAULT 14.844598,
	"lng" real DEFAULT 99.794765
);
