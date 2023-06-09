-- Show agent with the highest total order amount (ORDER_AMOUNT) on all theirs orders
SELECT agents.AGENT_NAME as AGENT_NAME, agents.AGENT_CODE as AGENT_CODE ,SUM(orders.ORD_AMOUNT) as ORD_AMOUNT  FROM `orders` LEFT JOIN agents on agents.AGENT_CODE = orders.AGENT_CODE GROUP BY agents.AGENT_CODE ORDER BY ORD_AMOUNT DESC
LIMIT 1;


-- Show CUST_CODE, CUST_NAME and the total amount they spent on all their orders with more than 5000.00 total amount (ORDER_AMOUNT)
SELECT customer.CUST_CODE as CUST_CODE, customer.CUST_NAME as CUST_NAME ,SUM(orders.ORD_AMOUNT) as ORD_AMOUNT  FROM `orders` LEFT JOIN customer on customer.CUST_CODE = orders.CUST_CODE GROUP BY customer.CUST_CODE HAVING ORD_AMOUNT > 5000;

-- Show AGENT_CODE and total number of orders during July of 2008 for each agent
SELECT agents.AGENT_CODE, COUNT(orders.ORD_NUM) AS total_orders
FROM agents
JOIN orders ON agents.AGENT_CODE = orders.AGENT_CODE
WHERE MONTH(orders.ORD_DATE) = 7 AND YEAR(orders.ORD_DATE) = 2008
GROUP BY agents.AGENT_CODE;