import { View, StyleSheet, ScrollView,Button } from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context"
import { Divider } from "react-native-paper";
import React,{useState,useEffect
} from "react";
import { openDatabase } from "react-native-sqlite-storage";
import { DB_NAME } from "../../config";

let db = openDatabase({ name: DB_NAME });

const GenerateReport = ({navigation}) => {

    const [totalemployee, settotalemployee] = useState(0);
    const [totaltasks, settotaltasks] = useState(0)
    const [cableconnections, setcableconnections] = useState(0);
    const [cableremoval, setcableremoval] = useState(0);
    const [totalincome, settotalincome] = useState(0);
    const [totalcustomers, settotalcustomers] = useState(0)
     useEffect(() => {
    countTotalEmployee();
    countConnectionBooking();
    countConnectionRemoval();
    countTotalTasks();
    countTotalCustomer();
    countTotalIncome();
    getTotalIncome();
  }, []);

  const countTotalEmployee = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_employee",
        [],
        (tx, res) => {
          
          settotalemployee(JSON.stringify(res.rows.length));
          console.log("item:", res.rows.length);
        },
        error => {
          console.log(error);
        }
      );
    });
  };

  const countTotalCustomer = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_customer",
        [],
        (tx, res) => {
          
          settotalcustomers(JSON.stringify(res.rows.length));
          console.log("item:", res.rows.length);
        },
        error => {
          console.log(error);
        }
      );
    });
  };

   const countConnectionBooking = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_connections WHERE connection_mode!=?",
        ['CONNECTION REMOVAL'],
        (tx, res) => {
          
          setcableconnections(JSON.stringify(res.rows.length));
          console.log("item:", res.rows.length);
        },
        error => {
          console.log(error);
        }
      );
    });
  };

   const countConnectionRemoval = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_connections WHERE connection_mode=?",
        ['CONNECTION REMOVAL'],
        (tx, res) => {
          
          setcableremoval(JSON.stringify(res.rows.length));
          console.log("item:", res.rows.length);
        },
        error => {
          console.log(error);
        }
      );
    });
  };

  const countTotalTasks = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_connections",
        [],
        (tx, res) => {
          
          settotaltasks(JSON.stringify(res.rows.length));
          console.log("item:", res.rows.length);
        },
        error => {
          console.log(error);
        }
      );
    });
  };

  const countTotalIncome = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_connections",
        [],
        (tx, res) => {
          console.log(res);
          settotaltasks(JSON.stringify(res.rows.length));
          console.log("item:", JSON.stringify(res.rows.length));
        },
        error => {
          console.log(error);
        }
      );
    });
  };

  const getTotalIncome = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM table_connections",
        [],
        (tx, res) => {
          var count=0;
          for (let i = 0; i < res.rows.length; ++i) {
                        var a = parseInt(res.rows.item(i).amount);
            count=count+a;
          }
          settotalincome(count);
          console.log("item:", res.rows.length);
          console.log(totalincome);
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_connections(cus_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), address VARCHAR(100),area VARCHAR(50),mobile VARCHAR(12),connection_name VARCHAR(50),connection_mode VARCHAR(50),planname VARCHAR(50),subscription VARCHAR(50),package VARCHAR(50),amount VARCHAR(10),payment_status VARCHAR(50),connection_status VARCHAR(50))",
              []
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
              <Divider/>
              <Text/>
             
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:21,marginTop:10}}>
                Total Employee :- {totalemployee}
              </Text>
              <Text/>
              <Divider/>
              <Text/>
             
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:21,marginTop:10}}>
                Total Customer :- {totalcustomers}
              </Text>
<Text/>
              <Divider/>
              <Text/>
              <Text variant="bodyMedium"style={{textAlign:"center",fontSize:21,marginTop:10}}>Total Tasks :- {totaltasks}</Text>
                     <Text/>
              <Divider/>
              <Text/>
                         <Text variant="bodyMedium"style={{textAlign:"center",fontSize:21,marginTop:10}}>Cable Connection :- {cableconnections}</Text>
                     <Text/>
              <Divider/>
              <Text/>
                         <Text variant="bodyMedium"style={{textAlign:"center",fontSize:21,marginTop:10}}>Cable Removal :- {cableremoval}</Text>
                     <Text/>
              <Divider/>
              <Text/>
                         <Text variant="bodyMedium"style={{textAlign:"center",fontSize:21,marginTop:10}}>Total Income :- {totalincome}</Text>
<Text/>
              <Divider/>
              <Text/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Text: {
    fontSize: 22,
    textAlign: "center",
    color: "black"
  },
  Text1: {
    fontSize: 19,
    textAlign: "center",
    color: "black"
  }
});
export default GenerateReport;
